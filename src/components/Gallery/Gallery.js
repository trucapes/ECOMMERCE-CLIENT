import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Tabs,
  Tab,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Button,
  CircularProgress,
  Box,
  Pagination,
  Skeleton,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import galleryAPI from "../../api/galleryApi";
import { handleFireBaseUpload } from "../../utils/upload-file";

const GalleryPopup = ({ open, onClose, setImage, setImages }) => {
  const [tab, setTab] = useState(0);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [file, setFile] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    if (open) {
      getGalleryItems(page);
      setFile(null);
      setSelectedItems([]);
    }
  }, [open, page]);

  const getGalleryItems = async (currentPage) => {
    setLoading(true);
    try {
      const response = await galleryAPI.getGalleryWithPagination({
        page: currentPage,
        limit: itemsPerPage,
      });
      setGalleryItems(response.data.gallery);
      setTotalPages(Math.ceil(response.data.total / itemsPerPage));
    } catch (error) {
      console.error("Error fetching gallery items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleImageSelect = (item) => {
    if (setImage) {
      setImage(item);
      onClose();
    } else if (setImages) {
      const newSelectedItems = selectedItems.includes(item)
        ? selectedItems.filter((i) => i !== item)
        : [...selectedItems, item];
      setSelectedItems(newSelectedItems);
    }
  };

  const handleConfirmSelection = () => {
    if (setImages) {
      setImages(selectedItems);
      onClose();
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    try {
      const imageUrl = await handleFireBaseUpload(file);
      const newimage = {
        title: file.name,
        url: imageUrl,
      };
      const response = await galleryAPI.add(newimage);
      const newImage = response.data;
      setGalleryItems([newImage, ...galleryItems]);
      setFile(null);
      setTab(0);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Gallery</DialogTitle>
      <DialogContent>
        <Tabs value={tab} onChange={handleTabChange}>
          <Tab label="Gallery" />
          <Tab label="Upload" />
        </Tabs>
        {tab === 0 && (
          <>
            {setImages && (
              <Box mt={2} display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  onClick={handleConfirmSelection}
                  disabled={selectedItems.length === 0}
                >
                  Confirm Selection
                </Button>
              </Box>
            )}
            <ImageList cols={3} gap={8}>
              {loading
                ? Array.from(new Array(itemsPerPage)).map((_, index) => (
                    <ImageListItem key={index}>
                      <Skeleton
                        variant="rectangular"
                        width={210}
                        height={118}
                      />
                    </ImageListItem>
                  ))
                : galleryItems.map((item) => (
                    <ImageListItem
                      key={item._id}
                      onClick={() => handleImageSelect(item)}
                      sx={{
                        maxHeight: 280,
                        cursor: "pointer",
                        "& img": {
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        },
                      }}
                    >
                      <img src={item.url} alt={item.title} loading="eager" />
                      <ImageListItemBar
                        title={item.title}
                        position="bottom"
                        sx={{
                          background: selectedItems.includes(item)
                            ? "#0dcaf0"
                            : "rgba(0, 0, 0, 0.5)",
                        }}
                      />
                    </ImageListItem>
                  ))}
            </ImageList>
            <Box mt={2} display="flex" justifyContent="center">
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          </>
        )}
        {tab === 1 && (
          <Box mt={2}>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="raised-button-file"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="raised-button-file">
              <Button
                variant="contained"
                component="span"
                startIcon={<CloudUploadIcon />}
              >
                Choose File
              </Button>
            </label>
            {file && <Box mt={1}>{file.name}</Box>}
            <Box mt={2}>
              <Button
                variant="contained"
                onClick={handleUpload}
                disabled={!file || loading}
              >
                Upload
              </Button>
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GalleryPopup;
