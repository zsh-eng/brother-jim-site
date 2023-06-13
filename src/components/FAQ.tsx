import React from "react";
// Question mark icon
import { FaQuestionCircle } from "react-icons/fa";

const QuestionButton = () => {
  return (
    <>
      <div
        className="top-18 tooltip tooltip-left absolute right-12"
        data-tip="How does this work?"
      >
        <button
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
          onClick={() => window.modal.showModal()}
          className="z-20 bg-transparent text-3xl"
        >
          <FaQuestionCircle className="hover:shadow-3xl h-8 w-8 bg-transparent text-gray-500 transition-all hover:scale-110 hover:text-blue-900" />
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
          <div className="modal-backdrop modal-action">
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
