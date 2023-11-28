import { useTask } from "../contexts/TaskContext";
import { useTableTask } from "../contexts/TableTaskContext";

export default function TableBody() {
  const { rows, searchedRows } = useTask();

  const { page, rowsPerPage, emptyRows, renderTasks } = useTableTask();

  return (
    <tbody>
      {searchedRows !== null
        ? searchedRows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => renderTasks(row))
        : rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => renderTasks(row))}
      {emptyRows > 0 && (
        <tr
          style={{
            height: `calc(${emptyRows} * 40px)`,
            "--TableRow-hoverBackground": "transparent",
          }}
        >
          <td colSpan={6} aria-hidden />
        </tr>
      )}
    </tbody>
  );
}
