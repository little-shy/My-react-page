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

function UserStatusConfirmation({
  user,
  open,
  onOpenChange,
  onConfirm,
}) {
  const isInactive = user?.status === "inactive";

  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent className="bg-slate-800 border-slate-600 text-slate-100 max-w-md">

        <AlertDialogHeader className="text-center">
          <AlertDialogTitle className="text-xl font-semibold text-slate-100">
            {isInactive ? "Activate User?" : "Deactivate User?"}
          </AlertDialogTitle>

          <AlertDialogDescription className="text-slate-400 text-sm leading-6 mt-2">
            Are you sure you want to change{" "}

            <span className="font-semibold text-slate-200">
              {user?.firstName} {user?.lastName}
            </span>

            {" "}to{" "}

            <span className="font-semibold text-slate-200">
              {isInactive ? "active" : "inactive"}
            </span>
            ?

            <br />

            <span
              className={
                isInactive
                  ? "text-emerald-400"
                  : "text-amber-400"
              }
            >
              {isInactive
                ? "This user will be marked as active."
                : "This user will no longer be marked as active."}
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="sm:justify-center gap-2 mt-2">

          <AlertDialogCancel className="border-slate-600 bg-slate-700 text-slate-200 hover:bg-slate-600 hover:text-white">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={onConfirm}
            className={
              isInactive
                ? "bg-emerald-500/90 text-white hover:bg-emerald-500"
                : "bg-amber-500/90 text-white hover:bg-amber-500"
            }
          >
            {isInactive ? "Set Active" : "Set Inactive"}
          </AlertDialogAction>

        </AlertDialogFooter>

      </AlertDialogContent>
    </AlertDialog>
  );
}

export default UserStatusConfirmation;