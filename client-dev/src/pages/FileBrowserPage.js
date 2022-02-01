import { Fragment, useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import fetchDownloadLink from "../api/fetchDownloadLink.js";
import fetchFiles from "../api/fetchFiles.js";
import BrowserToolbar from "../components/browserPage/BrowserToolbar.js";
import BrowserBody from "../components/browserPage/BrowserBody";
import BrowserFooter from "../components/browserPage/BrowserFooter";
import ErrorPage from "./ErrorPage";
import useGuildChannelParams from "../hooks/useGuildChannelParams";
import formatBytes from "../helpers/formatBytes.js";
import { fileBrowserActions } from "../store/store.js";
import Modal from "../components/ui/Modal.js";

const FileBrowserPage = () => {
  var { selectedChannel, selectedGuild, errorMessage } =
    useGuildChannelParams();

  const [modalOptions, setModalOptions] = useState(null);

  var selectedChannelId = null;

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const { lastMessagePointer, selectedRows, totalBytesSelected } = useSelector(
    (state) => state.fileBrowserSlice
  );
  const { moreMessages, messageArray } = useSelector(
    (state) => state.fileBrowserSlice.files
  );

  const deleteSelectionHandler = useCallback(() => {
    setModalOptions(null);

    alert(`Deleting ${selectedRows.length} files`);
  }, [selectedRows]);

  const closeModal = () => {
    setModalOptions(null);
  };

  if (selectedChannel) {
    selectedChannelId = selectedChannel.id;
  }

  const loadMoreDataHandler = useCallback(
    (firstRequest) => {
      if ((isLoading || !moreMessages) && !firstRequest) {
        return;
      }

      var fetchOptions = {
        channelId: selectedChannelId,
        lastMessageId: lastMessagePointer,
        callback: stopLoading,
      };

      if (firstRequest) {
        fetchOptions.lastMessageId = null;
      }

      startLoading();
      const generatedAction = fetchFiles(fetchOptions);

      dispatch(generatedAction);
    },
    [dispatch, lastMessagePointer, moreMessages, isLoading, selectedChannelId]
  );

  const sendFirstRequest = useCallback(() => {
    if (selectedChannelId) {
      console.log("Send request");
      var firstRequest = true;
      loadMoreDataHandler(firstRequest);
    }
  }, [loadMoreDataHandler, selectedChannelId]);

  useEffect(() => {
    sendFirstRequest();
  }, [selectedChannelId]);

  if (errorMessage) {
    return <ErrorPage message={errorMessage} />;
  }

  const startLoading = () => {
    // console.log("started loading");
    setIsLoading(true);
  };

  const stopLoading = () => {
    // console.log("stopping loading");
    setIsLoading(false);
  };

  const search = (term) => {
    dispatch(fileBrowserActions.changeSearchTerm(term));
  };

  function toolbarActionHandler(action) {
    switch (action) {
      case "loadMore":
        loadMoreDataHandler();
        break;
      case "delete":
        const l = selectedRows.length;

        if (selectedRows.length > 0) {
          setModalOptions({
            text: `Are you sure you want to delete ${selectedRows.length} file${
              l > 1 ? "s" : ""
            } ${formatBytes(totalBytesSelected)}?`,
            onConfirm: deleteSelectionHandler,
          });
        }

        break;
      case "refresh":
        sendFirstRequest();
        break;
      case "filter/image":
        search("image || png || jpg || jpeg || bmp || gif");
        break;
      case "filter/audio":
        search("audio || mp3");
        break;
      case "filter/video":
        search("video || mp4 || gif || webp || ogg");
        break;
      case "filter/pdf":
        search("document || pdf || doc ");
        break;
      case "filter/hazard":
        search("executable || bat || exe || bash");
        break;
      case "clear":
        search("");
        break;
      case "download":
        if (selectedRows.length === 0) {
          console.log("no rows selected");
          return;
        }

        const fileURLs = messageArray
          .filter((file) => selectedRows.includes(file.id))
          .map((file) => {
            return { url: file.url, name: file.name };
          });

        fetchDownloadLink(fileURLs)
          .then((res) => res.json())
          .then((data) => {
            console.log("Download link received", data);

            function download(url, filename) {
              fetch(url)
                .then(response => response.blob())
                .then(blob => {
                  const link = document.createElement("a");
                  link.href = URL.createObjectURL(blob);
                  link.download = filename;
                  link.click();
              })
              .catch(console.error);
            }

            download(data.link, data.name);
          }).catch(err => {
            console.log("Failed to get download link");
            console.log(err);
          })
        break;
      default:
        // search("");
        break;
    }
  }

  return (
    <Fragment>
      {modalOptions && (
        <Modal
          text={modalOptions.text}
          onCancel={closeModal}
          onConfirm={modalOptions.onConfirm}
        />
      )}

      <BrowserToolbar
        selectedChannel={selectedChannel}
        onToolbarAction={toolbarActionHandler}
        isLoading={isLoading}
        disabled={!moreMessages}
      />
      {!selectedChannel && <ErrorPage message="No channel selected" />}
      {selectedChannel && (
        <BrowserBody
          selectedChannel={selectedChannel}
          selectedGuild={selectedGuild}
          disabled={!moreMessages}
          isLoading={isLoading}
          getRows={loadMoreDataHandler}
        />
      )}

      <BrowserFooter />
    </Fragment>
  );
};

export default FileBrowserPage;
