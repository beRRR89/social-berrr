import React, {useState} from 'react';
import styles from "./Pagination.module.scss";

const Pagination = ({currentPage, totalItemsCount, pageSize, onPageChanged, portionSize}) => {
	let pagesCount = Math.ceil(totalItemsCount / pageSize);
	let pages = [];

	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i);
	}
	const portionCount = Math.ceil(pagesCount / portionSize);
	let [portionNumber, setPortionNumber] = useState(1);
	let leftPortionNumber = (portionNumber - 1) * portionSize + 1;
	let rightPortionNumber = portionNumber * portionSize;

	return (
			<div className={styles.pagination}>
				{ portionNumber > 1 && <button onClick={() => setPortionNumber(portionNumber - 1)}>PREV</button>}
				{
					pages
						.filter( p => p>=leftPortionNumber && p <= rightPortionNumber)
						.map((p, i) => {
						return (
							<span onClick={() => onPageChanged(p)}
								  className={currentPage === p ? styles.selectedPage : ""} key={i}>{p}</span>
						)
					})
				}
				{ portionCount > portionNumber && <button onClick={() => setPortionNumber(portionNumber + 1)}>NEXT</button>}
			</div>
	);
};

export default Pagination;