function ChapSelect({ 
  isOpen,           // boolean - открыт ли dropdown
  onClose,          // функция - закрыть dropdown
  chapters,         // массив - все главы
  currentChapterId, // number/id - текущая выбранная глава
  onSelectChapter   // функция - при выборе главы
}){
	return(
	<>
		<div 
			className="position-fixed top-0 left-0 w-100 h-100"
			style={{ 
				zIndex: 999,
				backgroundColor: 'rgba(0, 0, 0, 0.5)'
			}}
			onClick={() => onClose()}
		/>

		<div 
			className="position-fixed bg-dark rounded shadow"
			style={{ 
				top: '50px',
				left: '50%',
				transform: 'translateX(-50%)',
				zIndex: 1000,
				maxHeight: '300px',
				width: 'min(400px, 90vw)',
				overflowY: 'auto'
			}}
		>
			{chapters.map(chapter => (
				<div
					onClick={(e) => {
						onSelectChapter(chapter);
					}}
					className="p-3 text-white text-truncate"
					style={{ 
						cursor: 'pointer',
						backgroundColor: chapter.id === currentChapterId ? '#494949' : 'transparent'
					}}
				>
					Глава {chapter.chapter_number}
					{chapter.name && `: ${chapter.name}`}
				</div>
			))}
		</div>
	</>
	);
}

export default ChapSelect;