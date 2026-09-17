import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Trash2 } from "lucide-react";

function UserDeleteConfirmation({
  user,
  open,
  onOpenChange,
  onConfirm,
}) {
  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent className="bg-slate-800 border-slate-600 text-slate-100 max-w-md">

        <div className="flex justify-center mb-2">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20">
            <Trash2 className="w-7 h-7 text-red-400" />
          </div>
        </div>

        <AlertDialogHeader className="text-center">
          <AlertDialogTitle className="text-xl font-semibold text-slate-100">
            Delete User?
          </AlertDialogTitle>

          <AlertDialogDescription className="text-slate-400 text-sm leading-6 mt-2">
            You're about to permanently remove{" "}

            <span className="font-semibold text-slate-200">
              {user?.firstName} {user?.lastName}
            </span>

            {" "}from your users list.

            <br />

            <span className="text-red-400">
              This action cannot be undone.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="sm:justify-center gap-2 mt-2">

          <AlertDialogCancel className="border-slate-600 bg-slate-700 text-slate-200 hover:bg-slate-600 hover:text-white">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-500/90 text-white hover:bg-red-500"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete User
          </AlertDialogAction>

        </AlertDialogFooter>

      </AlertDialogContent>
    </AlertDialog>
  );
}

export default UserDeleteConfirmation;
