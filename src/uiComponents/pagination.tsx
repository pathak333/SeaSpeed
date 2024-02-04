import React, { useState, useEffect } from 'react';

const Pagination = () => {
    const min = 1;
    const max = 16;
    const [activePage, setActivePage] = useState(min);

    const handlePrevNextClick = (type: string) => {
        if (type === "prev" && activePage > min) {
            setActivePage(activePage - 1);
        } else if (type === "next" && activePage < max) {
            setActivePage(activePage + 1);
        }
    }

    const createPaginationNumBtns = (startIdx: number) => {
        const buttons = [];
        for (let i = startIdx; i <= max; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => handleNumBtnClick(i)}
                    className={`py-1 px-3 rounded-sm hover:bg-slate-200 min-w-[2.625rem] ${i === activePage ? 'activePage bg-slate-100' : ''}`}
                >
                    {i}
                </button>
            );
        }
        return buttons;
    }

    const handleNumBtnClick = (pageNumber: number) => {
        setActivePage(pageNumber);
    }

    useEffect(() => {
        // Update UI or perform actions when activePage changes
        // For example: checkPrevNextDisabled();
    }, [activePage]);

    return (
        <div className='flex flex-row place-content-between'>

            <button className="goPrev" onClick={() => handlePrevNextClick("prev")}>Previous</button>
            <div className="pagination">
                {createPaginationNumBtns(activePage >= 10 ? activePage - (6 - (max - activePage)) : min)}
            </div>
            <span className="flex justify-center py-1 select-none min-w-[2.625rem]">...</span>

            <button className="goNext" onClick={() => handlePrevNextClick("next")}>Next</button>
            {/* Other components and elements */}
        </div>
    );
}

export default Pagination;