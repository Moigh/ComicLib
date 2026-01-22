function ComicCard({ comic }) {
  return (
    <div 
    key={comic.id} 
		className="col-6 col-sm-4 col-md-3 col-lg-2"
		>
			<div className="card h-100 border-0">
				<div 
				style={{
					position: 'relative',
					paddingTop: '150%', 
					overflow: 'hidden'
				}}
				>
				<img 
					src={comic.cover_image}
					alt={comic.name}
					style={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					objectFit: 'cover'
					}}
				/>
				</div>
				
				<div className="card-body p-1">
					<h6 
						className="card-title " 
						style={{
						fontSize: '0.85rem',
						height: '2rem',
						overflow: 'hidden'
						}}
					>
						{comic.name}
					</h6>
					
					<div className="d-flex justify-content-between">
						<small className="text-muted" style={{ fontSize: '0.75rem' }}>
						{comic.year}
						</small>
						<small className="text-muted" style={{ fontSize: '0.75rem' }}>
						Глав: {comic.chapters_count}
						</small>
					</div>
				</div>
			</div>
		</div>
	);
}
export default ComicCard;