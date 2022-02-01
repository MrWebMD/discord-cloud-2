import React from "react";
import DropDown from "../ui/Inputs/DropDown";
import classes from "./BrowserToolbar.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGuildChannelParams from "../../hooks/useGuildChannelParams";
import BrowserToolbarButton from "./BrowserToolbarButton";

const BrowserToolbar = (props) => {
  const navigate = useNavigate();
  const { selectedGuild, selectedChannel } = useGuildChannelParams();
  const { fileBrowserPageURL } = useSelector((state) => state.appSlice.pages);
  const {isLoading, disabled} = props;
  const dropDownDefaultValue = selectedChannel
    ? selectedChannel.id
    : "Choose a channel";

  const dropDownChangeHandler = (data) => {
    navigate(`${fileBrowserPageURL}/${selectedGuild.id}/${data}`);
    console.log(data);
  };
  return (
    <header className={classes.browserToolbar}>
      <section>
        <div>
          <p>Channel</p>
        </div>
        <div>
          <DropDown
            placeholder="Choose a channel"
            onChange={dropDownChangeHandler}
            options={selectedGuild.channels}
            defaultValue={dropDownDefaultValue}
          />
        </div>
      </section>
      <section>
        <div>
          <p>Selection</p>
        </div>
        <div>
          <BrowserToolbarButton
            onClick={props.onToolbarAction}
            action="download"
          >
            <i className="fas fa-cloud-download-alt"></i>
          </BrowserToolbarButton>
          <BrowserToolbarButton
            onClick={props.onToolbarAction}
            action="delete"
          >
            <i className="fas fa-trash-alt"></i>
          </BrowserToolbarButton>
        </div>
      </section>

      <section>
        <div>
          <p>Table</p>
        </div>
        <div>
          <BrowserToolbarButton
            onClick={props.onToolbarAction}
            action="refresh"
            disabled={props.isLoading}
          >
            <i className="fas fa-sync-alt"></i>
          </BrowserToolbarButton>
          <BrowserToolbarButton
            onClick={props.onToolbarAction}
            action="loadMore"
            disabled={disabled || isLoading}
          >
            <i className="fas fa-angle-double-right"></i>
          </BrowserToolbarButton>
        </div>
      </section>
      <section>
        <div>
          <p>Quick Sort</p>
        </div>
        <div>
          <BrowserToolbarButton
            onClick={props.onToolbarAction}
            action="filter/image"
          >
            <i className="far fa-image"></i>
          </BrowserToolbarButton>
          <BrowserToolbarButton
            onClick={props.onToolbarAction}
            action="filter/video"
          >
            <i className="fas fa-video"></i>
          </BrowserToolbarButton>
          <BrowserToolbarButton onClick={props.onToolbarAction} action="filter/audio">
            <i className="fas fa-headphones"></i>
            </BrowserToolbarButton>
          <BrowserToolbarButton
            onClick={props.onToolbarAction}
            action="filter/pdf"
          >
            <i className="fas fa-file-pdf"></i>
          </BrowserToolbarButton>
          <BrowserToolbarButton
            onClick={props.onToolbarAction}
            action="filter/hazard"
          >
            <i className="fas fa-biohazard"></i>
          </BrowserToolbarButton>
          <BrowserToolbarButton onClick={props.onToolbarAction} action="clear">
            <i className="fas fa-times"></i>
          </BrowserToolbarButton>
        </div>
      </section>
    </header>
  );
};

export default BrowserToolbar;
