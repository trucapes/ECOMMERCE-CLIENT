function InputBox({
  label,
  required,
  setter,
  type,
  placeholder,
  name,
  id,
  className,
  inputClass,
  children,
}) {
  return (
    <div className={`w-full ${className ? className : ""}`}>
      <label htmlFor={name} className="capitalize font-roboto font-bold">
        {label}
        <span className={`text-red-700 ${required ? "inline" : "hidden"}`}>
          *
        </span>
      </label>
      <input
        onChange={(e) => {
          e.preventDefault();
          setter(e.target.value);
        }}
        type={type ? type : "text"}
        name={name}
        id={`${id ? id + "-" + name : name}`}
        className={`"bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-slate-600 block w-full ${
          inputClass ? inputClass : ""
        } p-3`}
        placeholder={placeholder}
        required=""
      />
      {children}
    </div>
  );
}

export default InputBox;
