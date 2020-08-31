import React, { useCallback } from 'react';
import GooglePlaces from './GooglePlaces';
// import ExtentsMap from './ExtentsMap';
import GoogleMaps from './GoogleMaps'
// import ItemsTable from './ItemsTable';

function StoresTableLayout({ results, total, num, q, start, onParamsChange }) {
  const onSearch = useCallback(
    newQ => {
      if (onParamsChange) {
        onParamsChange(newQ);
      }
    },
    [onParamsChange]
  );
  const changePage = useCallback(
    page => {
      if (onParamsChange) {
        const start = (page - 1) * num + 1;
        onParamsChange(q, start);
      }
    },
    [q, num]
  );
  const pageNumber = (start - 1) / num + 1;
  return (
    <>
      <div className="row mb-2">
        <div className="col-9">
          <h2>
            {/* Your search for &quot;{q}&quot; yielded {total} items */}
          </h2>
        </div>
        <div className="col-3">
          <GooglePlaces
            q={q}
            onSearch={onSearch}
            className="search-form-inline"
            size="sm"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <GoogleMaps items={results} />
          {/* <ItemsTable items={results} /> */}
          {/* <ItemPager
            pageSize={num}
            totalCount={total}
            pageNumber={pageNumber}
            changePage={changePage}
          /> */}
        </div>
      </div>
    </>
  );
}

export default StoresTableLayout;
