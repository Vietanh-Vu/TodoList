import Grid from "@mui/material/Grid";
import TableTask from "./components/TableTask";
import DenseAppBar from "./components/DenseAppBar";
import { TaskProvider } from "./contexts/TaskContext";
import FormDialog from "./components/FormDialogTask";
import TableTaskProvider from "./contexts/TableTaskContext";

function App() {
  return (
    <>
      <DenseAppBar />
      <Grid
        container
        spacing={0}
        justifyContent="center"
        // className={styles.centerContent}
      >
        <Grid item xs={1}></Grid>
        <Grid
          item
          xs={6}
          alignItems={"center"}
          sx={{ marginBottom: "100px" }}
        ></Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={8}>
          <TaskProvider>
            <FormDialog />
            <TableTaskProvider>
              <TableTask />
            </TableTaskProvider>
          </TaskProvider>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
