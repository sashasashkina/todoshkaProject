import React, { useEffect, useState } from "react";

import Board from "../../components/Screens/Board/Board";
import Icon from "../../components/Icon/Icon";

import css from "./ScreenPage.module.css";

import NewBoard from "../../components/Screens/NewBoard/NewBoard";
import Modal from "../../components/Modal/Modal";
import Filter from "../../components/Filter/Filter";

import {
  getFilter,
  selectAllBoards,
} from "../../redux/selectors/serviceSelector";
import {useDispatch, useSelector} from "react-redux";
import ButtonAdd from "../../components/ButtonAdd/ButtonAdd.jsx";
import {setModalContent, setModalStatus} from "../../redux/slice/servicesSlice.js";
// import { useTheme } from "../../hooks/useTheme";
// import { useNavigate } from "react-router";
// import {
//   selectCurrentUser,
//   selectIsLoggedIn,
//   } from "../../redux/selectors/selector";

const ScreensPage = () => {
  // const { theme, setTheme } = useTheme();
  const dispatch = useDispatch();
  const handleClickHelp = () => {
    dispatch(
        setModalContent({
          action: "addColum",
        })
    );
    dispatch(setModalStatus(true));
  };
  const [openFilter, setOpenFilter] = useState(false);
  const isBoards = useSelector(selectAllBoards);
  // const isLoggedIn = useSelector(selectIsLoggedIn);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigate(isBoards);
  //   }
  // }, []);
  const filter = useSelector(getFilter);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };
  const toggleFilter = () => {
    setOpenFilter(!openFilter);
  };
  return (

    <div className={css.screen}>
      {openFilter && (
        <Modal open={handleOpenFilter} onClose={toggleFilter}>
          <Filter onClose={toggleFilter} />
        </Modal>
      )}

      <div className={css.title_container}>
        <span className={css.title_wrap}>
          <button
            className={css.button_filter}
            type="button"
            onClick={handleOpenFilter}
          >
            <Icon id="filter" className={css.button_filter_icon} />
            Filter
          </button>
        </span>
      </div>
      {/*<ButtonAdd title="Add" className={css.submBtn} onClick={handleClickHelp}>*/}
      {/*  <Icon id="icon-icon-plus" />*/}
      {/*</ButtonAdd>*/}
      {isBoards.length === 0 ? <Board /> : <NewBoard />}


      {/* <NewBoard />
      <Board /> */}
    </div>
  );
};

export default ScreensPage;
