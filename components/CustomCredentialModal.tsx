import BaseModal from "./BaseModal";
import { CredentialsContext } from "@/pages/_app";
import React, { useState } from "react";

type Props = {
    show: boolean;
    onClose: () => void;
};

export default function EditCredentialModal({ show, onClose }: Props) {
    const [AvailableCredentials, setAvailableCredentials] = React.useContext(CredentialsContext);
    const [credentialJson, setCredentialJson] = useState();
    function getType(credential: any | undefined): string {
        let type = "undefined";
        if (credential) {
            type = credential!.type[credential!.type!.length - 1];
            console.log(credential);
            console.log(type);
        }
        return type;
    }

    return (
        <BaseModal show={show} securedByWalt={false} onClose={onClose}>
            <div className="flex flex-col items-center">
                <div className="w-full">
                    <textarea
                        value={JSON.stringify(credentialJson)}
                        onChange={(e) => {
                            try {
                                setCredentialJson(JSON.parse(e.target.value));
                            } catch (error) {
                                console.log(error);
                            }
                        }}
                        className="w-full h-48 border-2 border-gray-300 rounded-md p-2"
                        placeholder="Paste your JSON here"
                    />
                </div>
                <div className="flex flex-row justify-end gap-2 mt-5">
                    <button onClick={onClose}>
                        Cancel
                    </button>
                    <button onClick={() => {
                        setAvailableCredentials([
                            {
                                id: getType(credentialJson),
                                title: getType(credentialJson).replace(/([A-Z])/g, ' $1').trim(),
                                offer: credentialJson ? credentialJson : {},
                            },
                            ...AvailableCredentials
                        ]);
                        setCredentialJson(undefined);
                        onClose();
                    }}>
                        Save
                    </button>
                </div>
            </div>
        </BaseModal>
    )
}

