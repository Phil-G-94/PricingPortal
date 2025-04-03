import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import PodDisplayCard from "./PodDisplayCard.jsx";

function PodsDisplay({
    componentData,
    podDataUpdateTrigger,
    setPodDataUpdateTrigger,
}) {
    const [podsData, setPodsData] = useState([]);
    const [responseMessage, setResponseMessage] = useState("");
    const hasSavedPods = podsData !== undefined && podsData.length !== 0;

    const token = localStorage.getItem("token");

    const onDeletePodHandler = async (podId) => {
        try {
            const response = await fetch(
                `https://pricingportal.onrender.com/api/pods/${podId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    credentials: "include",
                }
            );

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
                const response = await fetch(
                    "https://pricingportal.onrender.com/api/pods",
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
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
        <>
            <h3>Your Saved Pods</h3>
            <section>
                {responseMessage && <p>{responseMessage}</p>}

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
            </section>

            {!hasSavedPods && <p>No pods saved. Choose a spec and get a price!</p>}
        </>
    );
}

PodsDisplay.propTypes = {
    componentData: PropTypes.array.isRequired,
    podDataUpdateTrigger: PropTypes.bool.isRequired,
    setPodDataUpdateTrigger: PropTypes.func.isRequired,
};

export default PodsDisplay;
