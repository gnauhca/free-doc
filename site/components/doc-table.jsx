import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const DocTable = function (props) {
  const { columns, data, size, border, stripe } = props;

  const className = classNames('spfx-doc-table', {
    'spfx-doc-table-border': border,
    'spfx-doc-table-stripe': stripe,
    [`spfx-doc-table-${size}`]: size 
  });

  return (
    <table className={className}>
      <colgroup>
        {columns.map((column, index) => <col key={index} width={column.width} />)}
      </colgroup>
      <thead>
        <tr>
          {columns.map((column, index) => <th key={index}>{column.title}</th>)}
        </tr>
      </thead>

      <tbody>
        {
          data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {
                columns.map((column, index) => (
                  <td key={index} style={column.style}>
                    { 
                      column.render ? <column.render index={index} row={row} /> : row[column.key]
                    }
                  </td>
                ))
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};

DocTable.prototypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  size: PropTypes.string,
  border: PropTypes.bool,
  stripe: PropTypes.bool
};

export default DocTable;