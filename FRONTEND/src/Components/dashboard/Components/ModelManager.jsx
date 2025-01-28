import React, { useCallback, useState } from "react";
import UpdateForm from "./UpdateForm";
import Permission from "./Permission";
import Model from "../comman/Model";

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
      case "permisstionModel": return <Permission openModel={openModel} onClose={closeModel} />;
      case "updateModel": return <UpdateForm onClose={closeModel} />;
      case "Permission": return <Model onClose={closeModel} />;
      default: return null;
    }
  }, [modelState.type]);

  return (
    <>
      <div className="model-button flex items-center justify-center gap-x-2">
        <button
          onClick={() => openModel("updateModel")}
          className="bg-dark border py-2 px-4 rounded-lg text-white font-inter text-xs"
        >
          Update
        </button>
      </div>
      {modelState.isOpen && (
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-0 overflow-y-auto backdrop-blur-sm bg-secondary/10">
            <div className="min-h-full flex items-center justify-center border p-4">
              {renderModelContent()}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(ModelManager);
