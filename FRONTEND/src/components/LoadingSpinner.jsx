import ClipLoader from "react-spinners/ClipLoader";

export default function LoadingSpinner() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
      }}
    >
      <ClipLoader color="#ffffff" size={60} />
    </div>
  );
}
