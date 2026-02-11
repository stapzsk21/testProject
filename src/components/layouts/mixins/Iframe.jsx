const Iframe = ({ isOpen, closeGame }) => {
  
  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  };

  const iframeWrapperStyle = {
    position: "relative",
    width: "90%",
    height: "90%",
    backgroundColor: "#000",
    borderRadius: "10px",
    overflow: "hidden",
  };

  const closeBtnStyle = {
    position: "absolute",
    top: "10px",
    right: "15px",
    zIndex: 10,
    fontSize: "20px",
    background: "white",
    border: "none",
    borderRadius: "50%",
    width: "35px",
    height: "35px",
    cursor: "pointer",
  };

  return (
    <>
      {isOpen && (
        <div style={overlayStyle}>
          <div style={iframeWrapperStyle}>
            <button style={closeBtnStyle} onClick={closeGame}>
              ✕
            </button>

            <iframe
              src="https://gateway.eva-digital-playground.com/v0/casino/games/launch?gameId=n2-novomatic-book-of-ra-deluxe&channel=desktop&partnerKey=0wl&lobbyUrl=https://chinchincasino.com&mode=demo&language=en"
              title="Game"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Iframe;
