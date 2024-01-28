import React from "react";
// Question mark icon
import { FaQuestionCircle } from "react-icons/fa";

const QuestionButton = () => {
  return (
    <>
      <div className="tooltip tooltip-left" data-tip="How does this work?">
        <button
          onClick={() => (window as unknown as ModalWindow).modal.showModal()}
          className="btn btn-circle btn-ghost"
        >
          <FaQuestionCircle className="h-6 w-6" />
        </button>
      </div>

      <dialog id="modal" className="modal modal-bottom sm:modal-middle">
        <form method="dialog" className="modal-box">
          <h3 className="text-lg font-bold">What are the graphs showing?</h3>
          <p className="py-4">Let&apos;s explore what each graph means:</p>

          <h4 className="font-bold">Weekly Comparison</h4>
          <p>
            The lighter-colored graph gives you a glimpse of crowd levels on the
            same day of the week as today from the previous week. It helps you
            compare current crowd trends with the past.
          </p>
          <br />

          <h4 className="font-bold">Real-Time Snapshot</h4>
          <p>
            The darker-colored graph represents the crowd level for today,
            updated to the last 15 minutes.
          </p>
          <div className="modal-action modal-backdrop">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </div>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default QuestionButton;
