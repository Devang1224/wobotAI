import React from "react";

const Table = React.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return (
      <table ref={ref} className={`table-base ${className || ""}`} {...props}>
        {children}
      </table>
    );
  },
);

const Thead = React.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return (
      <thead ref={ref} className={`table-head ${className || ""}`} {...props}>
        {children}
      </thead>
    );
  },
);

const Tr = React.forwardRef(({ children, className = "", ...props }, ref) => {
  return (
    <tr ref={ref} className={`table-row ${className || ""}`} {...props}>
      {children}
    </tr>
  );
});

const Th = React.forwardRef(({ children, className = "", ...props }, ref) => {
  return (
    <th ref={ref} className={`table-head-item ${className || ""}`} {...props}>
      {children}
    </th>
  );
});

const Td = React.forwardRef(({ children, className = "", ...props }, ref) => {
  return (
    <td ref={ref} className={`table-cell ${className || ""}`} {...props}>
      {children}
    </td>
  );
});

const Tbody = React.forwardRef(({ children, className = "", ...props }, ref) => {
  return (
    <tbody ref={ref} className={`table-body ${className || ""}`} {...props}>
      {children}
    </tbody>
  );
});

Table.displayName = "Table";
Thead.displayName = "Thead";
Tr.displayName = "Tr";
Th.displayName = "Th";
Td.displayName = "Td";
Tbody.displayName = "Tbody";

export { Thead, Tr, Th, Td, Tbody };
export default Table;