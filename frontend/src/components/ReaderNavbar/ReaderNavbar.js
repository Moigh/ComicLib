function ReaderNavbar({ 
  onOpenChapSelect,
	onNavigate,
  comicName, 
  currentChapterNumber, 
	currentChapterName,
	currentPageIndex,
	currentPage,
	currentChapterPagesLength
}){
	return(
	<nav style={{
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		backgroundColor: 'rgb(8, 11, 24)',
		color: 'white',
		padding: '0.5rem 1rem',
		zIndex: 100,
		display: 'flex',
		alignItems: 'center',
		gap: '1rem'
	}}
	>
		<div style={{ flex: 1 }}>
			<button 
				onClick={() => onNavigate()}
				className="btn btn-link text-white text-decoration-none text-truncate d-none d-md-block"
				style={{ maxWidth: '200px' }}
			>
				{comicName}
			</button>
			
			<button 
				onClick={() => onNavigate()}
				className="btn btn-outline-light btn-sm d-md-none"
			>
				←
			</button>
		</div>
		
		<div className="position-relative flex-grow-1" style={{ minWidth: 0 }}>
			<button 
				onClick={(e) => {
					onOpenChapSelect();
				}}
				className="btn btn-outline-light text-truncate w-100 p-2"
			>
				Глава {currentChapterNumber}
				{currentChapterName && `: ${currentChapterName}`}
			</button>
		</div>

		<div className="text-white-50 text-nowrap fs-6" style={{ flex: 1, textAlign: 'right' }}>
			{currentPage 
			? `${currentPageIndex + 1} / ${currentChapterPagesLength}`
			:null}
		</div>
	</nav>
	);
}

export default ReaderNavbar;