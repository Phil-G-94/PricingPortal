import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import PodDisplayCard from "./PodDisplayCard.jsx";

function PodsDisplay({ componentData, podDataUpdateTrigger }) {
    const [podsData, setPodsData] = useState([]);
    const [responseMessage, setResponseMessage] = useState("");
    const hasSavedPods =
        podsData !== undefined && podsData.length !== 0;

    const token = localStorage.getItem("token");

    const onDeletePodHandler = async (podId) => {
        try {
            const response = await fetch(
                `https://pricingportal.onrender.com/pods/${podId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Something went wrong trying to delete the pod..."
                );
            }

            const updatedPods = podsData.filter(
                (pod) => pod._id !== podId
            );

            setPodsData(updatedPods);

            console.log();
        } catch (error) {
            console.error(error);
            setResponseMessage("Error deleting pod.");
        }
    };

    useEffect(() => {
        try {
            const fetchPodsData = async () => {
                const response = await fetch(
                    "https://pricingportal.onrender.com/pods",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

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
    }, [token, podDataUpdateTrigger]);

    return (
        <section>
            {responseMessage && <p>{responseMessage}</p>}

            <h3 className="centred-text">Your Saved Pods</h3>
            {hasSavedPods &&
                podsData?.map((pod) => {
                    return (
                        <PodDisplayCard
                            key={pod._id}
                            pod={pod}
                            componentData={componentData}
                            onDeletePodHandler={onDeletePodHandler}
                        />
                    );
                })}
            {!hasSavedPods && (
                <p className="centred-text">
                    No pods saved. Choose a spec and get a price!
                </p>
            )}
        </section>
    );
}

PodsDisplay.propTypes = {
    podDataUpdateTrigger: PropTypes.bool.isRequired,
    componentData: PropTypes.array.isRequired,
};

export default PodsDisplay;
