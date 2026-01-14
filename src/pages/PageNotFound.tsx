import NotFoundImage from "../assets/not-found-bg.jpg";

const PageNotFound = () => {
  return (
    <div className="w-full h-full p-32 flex items-center justify-center">
      <img
        src={NotFoundImage}
        alt="Not Found"
        className="w-3/4 h-3/4 object-cover"
      />
    </div>
  );
};

export default PageNotFound;
