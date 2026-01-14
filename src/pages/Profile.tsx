import ComingSoon from "@/assets/coming-soon-bg.jpg";

const Profile = () => {
  return (
    <div className="w-full h-full p-32 flex flex-col gap-5 items-center justify-center">
      <img
        src={ComingSoon}
        alt="Coming Soon"
        className="w-1/2 h-1/2 object-cover"
      />
      <span>Profile coming soon!</span>
    </div>
  );
};

export default Profile;
