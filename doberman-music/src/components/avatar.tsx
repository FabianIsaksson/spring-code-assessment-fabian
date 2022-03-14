import "./avatar.scss";

const Avatar = ({ name, image }: { name: string; image: string }) => {
  return (
    <li role="button" className="avatar">
      {image ? (
        <img className="avatar-image" alt="avatar" src={image}></img>
      ) : (
        <div className="avatar-fallbackimage"></div>
      )}

      {name && <p className="avatar-name">{name}</p>}
    </li>
  );
};

export default Avatar;
