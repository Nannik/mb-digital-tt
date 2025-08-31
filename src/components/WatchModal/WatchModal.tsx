import React, { useCallback, useEffect, useRef } from "react"
import { Button, Modal } from "react-bootstrap"
import { useAppDispatch } from "../../app/model/store"
import { useSelector } from "react-redux";
import { videoActions, videoSelector } from "./model/state";

export const WatchModal = () => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLVideoElement | null>(null);

  const { open, url } = useSelector(videoSelector);

  const handleClose = useCallback(() => {
    dispatch(videoActions.setOpen(false))
  }, [dispatch])

  useEffect(() => {
    const listener = () => {
      if (ref.current)
        dispatch(videoActions.updateReadyState(ref.current.readyState));
    }

    ref.current?.addEventListener('loadeddata', listener);
    return () => {
      ref.current?.removeEventListener('loadeddata', listener);
    }
  }, [ref.current, dispatch])

  return (
    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton />
      <Modal.Body>
      { url ? (
        <video ref={ref} className="w-100" controls>
          <source src={url} type="video/mp4" />
        </video>
      ) : (
        <span>
          It has to be video modal... But it's not...
        </span>
      )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
