import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

function DeleteDeck(props) {
  const [open, setOpen] = React.useState(false)
  return (
    <Modal
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='small'
      trigger={<Button color='red'>Delete Deck</Button>}
    >
      <Header icon>
        <Icon name='trash' />
        Delete Deck
      </Header>
      <Modal.Content>
        <p>Are you sure you want to delete this deck?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color='red' inverted onClick={() => setOpen(false)}>
          <Icon name='remove' /> No
        </Button>
        <Button color='green' inverted onClick={() => setOpen(false)} onClick = {() => props.deleteDeck(props.deckId)}>
          <Icon name='checkmark' /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default DeleteDeck