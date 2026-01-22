import styles from './ComicCard.module.css'; 

function ComicCard({ comic }) {
  return (
    <div 
    key = {comic.id} 
		className = "col-6 col-sm-4 col-md-3 col-lg-2"
		>
			<div className = "card h-100 border-0">
				<div className = {`${styles.body}`}>
				<img 
					src = {comic.cover_image}
					alt = {comic.name}
					className = {`${styles.image}`}
				/>
				</div>
				
				<div className = "card-body p-1">
					<h6 
						className = {`card-title ${styles.title}`} 
					>
						{comic.name}
					</h6>
					
					<div className = "d-flex justify-content-between">
						<small className = {`text-muted ${styles.text}`}>
						{comic.year}
						</small>
						<small className = {`text-muted ${styles.text}`}>
						Глав: {comic.chapters_count}
						</small>
					</div>
				</div>
			</div>
		</div>
	);
}
export default ComicCard;