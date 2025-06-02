import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import PodDisplayCard from "./PodDisplayCard.jsx";

const API_BASE_URL = import.meta.env.VITE_API_URL;

function PodsDisplay({ componentData, podDataUpdateTrigger, setPodDataUpdateTrigger }) {
  const [podsData, setPodsData] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");
  const hasSavedPods = podsData !== undefined && podsData.length !== 0;

  const onDeletePodHandler = async (podId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/pods/${podId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Something went wrong trying to delete the pod...");
      }

      const updatedPods = podsData.filter((pod) => pod._id !== podId);

      setPodsData(updatedPods);
    } catch (error) {
      console.error(error);
      setResponseMessage("Error deleting pod.");
    }
  };

  useEffect(() => {
    try {
      const fetchPodsData = async () => {
        const response = await fetch(`${API_BASE_URL}/api/pods`, {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const jsonResponse = await response.json();

        if (!response.ok) {
          const { message } = jsonResponse;

          if (message) {
            setResponseMessage(message);
          }

          return;
        }

        setPodsData(jsonResponse.pods);
      };

      fetchPodsData();
    } catch (error) {
      console.error(error);
    }
  }, [podDataUpdateTrigger]);

  return (
    <>
      <h2 className="text-center text-2xl">Saved Pods</h2>
      <section>
        <div className="grid grid-cols-1 place-items-center md:grid-cols-2 gap-4">
          {hasSavedPods &&
            podsData?.map((pod) => {
              return (
                <PodDisplayCard
                  key={pod._id}
                  pod={pod}
                  componentData={componentData}
                  onDeletePodHandler={onDeletePodHandler}
                  setPodDataUpdateTrigger={setPodDataUpdateTrigger}
                />
              );
            })}
          {responseMessage && <p className="text-red-500">{responseMessage}</p>}
        </div>
      </section>

      {!hasSavedPods && (
        <p className="text-center">No pods saved. Choose a spec and get a price!</p>
      )}
    </>
  );
}

PodsDisplay.propTypes = {
  componentData: PropTypes.shape({
    baseComponents: PropTypes.arrayOf(PropTypes.object),
    resourceComponents: PropTypes.arrayOf(PropTypes.object),
  }),

  podDataUpdateTrigger: PropTypes.bool.isRequired,
  setPodDataUpdateTrigger: PropTypes.func.isRequired,
};

export default PodsDisplay;
