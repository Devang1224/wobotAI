import React from "react";

 const Table = React.forwardRef(({
    children,
    className="",
    ...props
},ref)=>{
    return (
        <table 
          ref={ref}
          className={`table-base ${className || ""}`}
         {...props}
         >
            {children}
        </table>
    )
})
Table.displayName = "Table";

export default Table;