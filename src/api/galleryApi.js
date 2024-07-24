import api from "./apiwrapper";

const galleryAPI = {
  add: async (data) => {
    const response = await api.post("/items/gallery", data);
    return response;
  },

  getGalleryWithPagination: async (filter) => {
    const response = await api.get("/items/gallery/pagination", {params: filter});
    return response;
  },

};

export default galleryAPI;
