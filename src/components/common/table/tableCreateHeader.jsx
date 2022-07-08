import { Link } from "react-router-dom";

const TableCreateHeader = ({ totalCount, btnMode, link, btnTitle }) => {
  return (
    <div className="pageheader">
      <p>{totalCount} رکورد در دیتابیس موجود می‌باشد.</p>

      <Link className={`btn btn-${btnMode}`} to={link}>
        {btnTitle}
      </Link>
    </div>
  );
};

export default TableCreateHeader;
