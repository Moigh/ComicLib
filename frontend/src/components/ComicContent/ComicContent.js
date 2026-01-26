import React from 'react';
import ComicChaps from '../ComicChaps';
import { Link } from 'react-router-dom';

function ComicContent( {comic, chapters}) {
  return (
		<>		
		<h1 className="mb-3">{comic.name}</h1>
		
		<div className="mb-4">
			<div className="d-flex flex-wrap gap-2 mb-2">
				{comic.authors?.map((author, idx) => (
					<span key={idx} className="badge bg-primary">
						{author.name}
					</span>
				))}
			</div>
			<div className="text-muted"> {comic.year}</div>
		</div>
		<div className="mb-5">
			<h4>Описание</h4>
			<p className="fs-5">{comic.description}</p>
		</div>
		<div className="mb-5">
			<h4>Главы ({chapters?.length || 0})</h4>
			<ComicChaps chapters={chapters}/>
				
		</div></>
  );
}

export default ComicContent;