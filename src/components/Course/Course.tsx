import React, { useCallback } from 'react'
import { Button, Card } from "react-bootstrap";
import { buy } from './model/thunk';
import { useAppDispatch } from '../../app/model/store';
import { videoActions } from '../WatchModal/model/state';

type Props = {
  id: number,
  title: string,
  description: string,
  price: number,
  videoUrl: string | null
  loading?: boolean
}

export const Course = (props: Props) => {
  const {
    id,
    title,
    description,
    price,
    videoUrl,
    loading
  } = props;

  const dispatch = useAppDispatch()

  const handleBuy = useCallback(() => {
    dispatch(buy(id))
  }, [id, dispatch])

  const handleWatch = useCallback(() => {
    if (!videoUrl) return;

    dispatch(videoActions.setUrl(videoUrl))
    dispatch(videoActions.setOpen(true))
  }, [videoUrl, id, dispatch])

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        {!videoUrl && (<Card.Subtitle>${price}</Card.Subtitle>)}
        <Card.Text>{description}</Card.Text>
        {videoUrl ? (
          <Button variant="primary" onClick={handleWatch} disabled={loading}>Watch</Button>
        ) : (
          <Button variant="primary" onClick={handleBuy} disabled={loading}>Buy</Button>
        )}
      </Card.Body>
    </Card>
  )
}
