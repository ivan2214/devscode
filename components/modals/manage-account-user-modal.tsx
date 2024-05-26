import {ManageAccountUserForm} from "@components/account/manage-account-user-form"
import {Dialog, DialogContent} from "@ui/dialog"
import {useManageAccountUserModal} from "@/store/use-manage-account-user-modal"

export const ManageAccountUserModal = () => {
  const {isOpen, close} = useManageAccountUserModal()

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="h-[calc(80%-10rem)] max-w-xs rounded lg:h-[calc(100%-5rem)] lg:max-w-screen-md">
        <ManageAccountUserForm />
      </DialogContent>
    </Dialog>
  )
}
