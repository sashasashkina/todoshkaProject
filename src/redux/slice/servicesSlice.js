import { createSlice } from "@reduxjs/toolkit";

import {
  addBoardThunk,
  deleteBoardThunk,
  editBoardThunk,
  fetchSingleBoard,
  getBoardThunk,
} from "../thunk/servicesThunk";
import {
  addColumnAsync,
  deleteColumnAsync,
  editColumnAsync,
} from "../thunk/columnsThunk";
import {
  addTaskAsync,
  deleteTaskAsync,
  editTaskAsync,
  moveTaskAsync,
} from "../thunk/tasksThunk";

const initialState = {
  boards: [],
  selectedBoard: {},
  error: null,
  isLoading: false,
  openModal: false,
  modalContent: {
    endPoint: null,
    action: null,
    recordDataEdit: null,
    AddId: null,
    editedData: null,
  },
};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setModalStatus: (state, action) => {
      state.openModal = action.payload;
    },
    setModalContent: (state, action) => {
      state.modalContent = { ...state.modalContent, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // /////////////PENDING////////////
      .addCase(getBoardThunk.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(addBoardThunk.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchSingleBoard.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(editBoardThunk.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(deleteBoardThunk.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      // //////////FULFILD///////////////////
      .addCase(getBoardThunk.fulfilled, (state, action) => {
        state.error = null;
        state.boards = [...action.payload];
        state.isLoading = false;
      })
      .addCase(addBoardThunk.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.boards.push(action.payload);
      })

      // .addCase(fetchSingleBoard.fulfilled, (state, action) => {
      //   state.error = null;
      //   state.isLoading = false;
      //   if (action.payload.columns[0]) {
      //     state.selectedBoard = action.payload;
      //     return;
      //   }
      //   state.selectedBoard = action.payload;
      //   state.selectedBoard.columns = [];
      // })

      .addCase(fetchSingleBoard.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        if (
          action.payload.columns &&
          action.payload.columns[0] &&
          action.payload.columns[0].hasOwnProperty("_id")
        ) {
          state.selectedBoard = action.payload;
        } else {
          state.selectedBoard = action.payload;
          state.selectedBoard.columns = [];
        }
      })

      .addCase(editBoardThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedBoard.title = action.payload.title;
        state.selectedBoard.icon = action.payload.icon;
        state.selectedBoard.background = action.payload.background;
        const idx = state.boards.findIndex(
          (el) => el._id === action.payload._id
        );
        state.boards[idx] = action.payload;
      })
      .addCase(deleteBoardThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const idx = state.boards.findIndex((el) => el._id === action.payload);
        state.boards.splice(idx, 1);
        if (state.selectedBoard._id === action.payload) {
          state.selectedBoard = {};
        }
      })
      // /////////////////REJECTED/////////////////
      .addCase(getBoardThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addBoardThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchSingleBoard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(editBoardThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteBoardThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // columns///////////////
      .addCase(deleteColumnAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteColumnAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        const idx = state.selectedBoard.columns.findIndex(
          (el) => el._id === action.payload
        );

        if (idx === -1) {
          return state;
        }
        state.selectedBoard.columns.splice(idx, 1);
      })
      .addCase(deleteColumnAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //editColumn
      .addCase(editColumnAsync.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(editColumnAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        const { _id, title } = action.payload;
        const columnIndex = state.selectedBoard.columns.findIndex(
          (el) => el._id === _id
        );
        if (columnIndex !== -1) {
          state.selectedBoard.columns[columnIndex].title = title;
        }
      })

      .addCase(editColumnAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //addColumn
      .addCase(addColumnAsync.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(addColumnAsync.fulfilled, (state, action) => {
        state.selectedBoard.columns.push(action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addColumnAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // /////////////Tasks////////////
      //-----------Pending--------------
      .addCase(addTaskAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editTaskAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTaskAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(moveTaskAsync.pending, (state) => {
        state.isLoading = true;
      })
      //--------------Fulfilled-------------------
      .addCase(addTaskAsync.fulfilled, (state, action) => {
        state.isLoading = false; // Зміна isLoading на false, оскільки завантаження завершене.
        state.error = null;

        const task = action.payload; // Отримуємо завдання з action.payload

        // Знаходимо стовпець, до якого потрібно додати завдання
        const columnIndex = state.selectedBoard.columns.findIndex(
          (column) => column._id === task.column
        );

        // Додаємо завдання до відповідного стовпця
        if (columnIndex !== -1) {
          state.selectedBoard.columns[columnIndex].tasks.push(task);
        } else {
          // Якщо не вдалося знайти стовпець за його id, можливо, потрібно обробити помилку.
          state.error = "Column not found"; // Наприклад, встановлюємо помилку.
        }
      })

      .addCase(editTaskAsync.fulfilled, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.tasks = action.payload.tasks;
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        const { _id, column_id } = action.payload;

        const idx = state.selectedBoard.columns.findIndex(
          (column) => column._id === column_id
        );

        if (idx !== -1) {
          const column = state.selectedBoard.columns[idx];

          const taskIndex = column.tasks.findIndex((task) => task._id === _id);
          if (taskIndex !== -1) {
            column.tasks.splice(taskIndex, 1);
          }
        }
      })
      .addCase(moveTaskAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.boards = action.payload.boards;
      })
      //-------------Rejected-------------
      .addCase(addTaskAsync.rejected, (state, action) => {
        state.isLoading = true;
        state.error = action.payload;
      })
      .addCase(editTaskAsync.rejected, (state, action) => {
        state.isLoading = true;
        state.error = action.payload;
      })
      .addCase(deleteTaskAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(moveTaskAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setModalStatus, setModalContent, addColumnSuccess } =
  serviceSlice.actions;
const serviceReducer = serviceSlice.reducer;
export default serviceReducer;
