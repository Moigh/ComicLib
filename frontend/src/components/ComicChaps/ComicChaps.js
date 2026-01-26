
import { Link } from 'react-router-dom';

function ComicChaps({chapters}){
	return(
		chapters && chapters.length > 0 ? (
			<div className="list-group mt-3">
				{chapters.map(chapter => (
					<Link
						key={chapter.id}
						to={`/reader/${chapter.id}`}
						className="list-group-item list-group-item-action d-flex justify-content-between"
						style={{
							minHeight: '3rem',
							overflow: 'hidden'
						}}
					>
						<div className="text-truncate flex-grow-1">
							<strong>Глава {chapter.chapter_number}</strong>
							{chapter.name && ` - ${chapter.name}`}
						</div>
						<span className="text-muted flex-shrink-0 ms-2">
							{chapter.pages_count || 0} стр.
						</span>
					</Link>
				))}
			</div>
		) : (
			<p className="text-muted">Главы не добавлены</p>
		)
	);
}
export default ComicChaps;

