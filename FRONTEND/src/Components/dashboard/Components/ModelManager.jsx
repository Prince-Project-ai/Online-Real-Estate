import React, { useCallback, useState } from "react";
import CreateForm from "./CreateForm";
import UpdateForm from "./UpdateForm";

const ModelManager = () => {
  const [modelState, setModelState] = useState({
    isOpen: false,
    type: null,
  });

  const openModel = useCallback((type) => {
    setModelState({ isOpen: true, type: type });
  }, []);

  const closeModel = useCallback(() => {
    setModelState({ isOpen: false, type: null });
  }, []);

  const renderModelContent = useCallback(() => {
    switch (modelState.type) {
      case "createModel":
        return <CreateForm onClose={closeModel} />;

      case "updateModel":
        return <UpdateForm onClose={closeModel} />;

      default:
        return null;
    }
  }, [modelState.type]);

  return (
    <>
      <div className="model-button flex items-center justify-center gap-x-2">
        <button
          onClick={() => openModel("createModel")}
          className="bg-secondary border py-2 px-4 rounded-lg text-dark font-inter text-xs"
        >
          create
        </button>
        <button
          onClick={() => openModel("updateModel")}
          className="bg-secondary border py-2 px-4 rounded-lg text-dark font-inter text-xs"
        >
          Update
        </button>
      </div>
      {modelState.isOpen && (
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-0 overflow-y-auto backdrop-blur-sm bg-secondary/10">
            <div className="min-h-full flex items-center justify-center border p-4">
              {/* {currentModel === "createModel" && <CreateForm />}
              {currentModel === "updateModel" && <UpdateForm />} */}
              {renderModelContent()}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(ModelManager);
