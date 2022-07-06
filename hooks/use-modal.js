import { useContext } from "react"
import { ModalContext } from "../providers/modal-provider"

const useModal = (dialog) => {
  const { displayModal } = useContext(ModalContext)

  return {
    openModal: (props={}) => {
      displayModal(dialog, props)
    }
  }
}

export default useModal