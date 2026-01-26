
function ComicPoster({comic}) {
  return (
  <>
  <div className="d-none d-md-flex align-items-center justify-content-center bg-dark"
  style={{
    width: 'auto',
    padding: 0,
    maxWidth: '50%',
    flexShrink: 0
  }}>
    <img 
      src={comic.cover_image} 
      alt={comic.name}
        className="img-fluid rounded"
    />
  </div>
  </>
  );
}

export default ComicPoster;