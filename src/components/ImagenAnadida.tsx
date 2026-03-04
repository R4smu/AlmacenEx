
const ImageUploader = ({ image }: any) => {

  return (
    <div className="w-60 h-60 border-2 rounded flex flex-col items-center justify-center cursor-pointer border-black dark:border-white">
      <img
        src={image}
        alt="Image"
        className="flex justify-center object-cover rounded text-black dark:text-white"
      />
      <span className="text-gray-400 dark:text-white text-sm text-center">
        Pulsa para subir<br />una imagen
      </span>
      <input
        type="file"
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

export default ImageUploader;
