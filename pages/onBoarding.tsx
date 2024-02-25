import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  LogoImage,
  digitalnomad,
  safety,
  trust,
} from "../public/assets/images";

import CustomCredentialModal from '../components//CustomCredentialModal';
import Credential from '../components/Credential';
import { AvailableCredential } from './api/credentials';
import { CredentialsContext } from '@/pages/_app';

type CredentialToIssue = AvailableCredential & {
  selected: boolean;
};


const OnBoarding = () => {
  const router = useRouter();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const COLORS = { primary: "#F6D268", white: "#fff", black: "#072454" };
  
  const [AvailableCredentials] = React.useContext(CredentialsContext);
  const [credentialsToIssue, setCredentialsToIssue] = useState<CredentialToIssue[]>(prepareCredentialsToIssue);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);

  const showButton = credentialsToIssue.some((cred) => cred.selected);
  const credentials = !searchTerm ? credentialsToIssue : credentialsToIssue.filter(credential => {
    return credential.title.toLowerCase().includes(searchTerm.toLowerCase());
  })

  function prepareCredentialsToIssue(): CredentialToIssue[] {
    return AvailableCredentials.map((cred: AvailableCredential) => {
      return {
        ...cred,
        selected: false,
      };
    });
  }

  React.useEffect(() => {
    setCredentialsToIssue(prepareCredentialsToIssue);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [AvailableCredentials]);

  function getIdsForCredentialsToIssue() {
    const ids: string[] = [];
    credentialsToIssue.forEach((cred) => {
      if (cred.selected) {
        ids.push(cred.id);
      }
    });

    return ids;
  }

  function handleCredentialSelect(id: string) {
    const updatedCreds = credentialsToIssue.map((cred) => {
      if (cred.id === id) {
        return {
          ...cred,
          selected: !cred.selected,
        };
      } else {
        return cred;
      }
    });

    setCredentialsToIssue(updatedCreds);
  }

  function handleStartIssuance() {
    const idsToIssue = getIdsForCredentialsToIssue();

    const params = new URLSearchParams();
    params.append('ids', idsToIssue.join(','));

    router.push(`/credentials?${params.toString()}`);
  }

  function handleSearchTermChange(e: any) {
    const value = e.target.value;
    setSearchTerm(value);
  }
  
  
  const slides = [
    {
      id: "1",
      image: safety,
      title: "Safety First",
      subtitle: "We keep you safe wherever you go.",
    },
    {
      id: "2",
      image: trust,
      title: "Based on Trustable Group Network",
      subtitle: "We organize events for you based on your trust group",
    },
    {
      id: "3",
      image: digitalnomad,
      title: "Big increase in Digital Nomads",
      subtitle:
        "There has been a significant increase in the number of digital nomads worldwide since the COVID-19 era",
    },
    {
      id: "4",
      image: digitalnomad,
      title: "Big increase in Digital Nomads",
      subtitle:
        "There has been a significant increase in the number of digital nomads worldwide since the COVID-19 era",
    },
  ];

  const updateCurrentSlideIndex = (index: any) => {
    setCurrentSlideIndex(index);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex < slides.length) {
      setCurrentSlideIndex(nextSlideIndex);
    } else {
      router.push("/home");
    }
  };

  const skip = () => {
    router.push("/home");
  };

  return (
    
    <div className="bg-[#F6D268] min-h-screen flex flex-col justify-center items-center">
      {currentSlideIndex < slides.length - 1 && (
      <>
      <div className="flex flex-col items-center space-y-2 ">
          <Image
            src={slides[currentSlideIndex].image}
            className="w-72 h-72"
            alt={slides[currentSlideIndex].title} />
          <h1 className="text-3xl font-bold text-orange-500 text-center p-5">
            {slides[currentSlideIndex].title}
          </h1>
          <p className="text-base font-bold text-gray-800 p-10 text-center">
            {slides[currentSlideIndex].subtitle}
          </p>
        </div><div className="flex items-center space-x-4 mt-8">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-3 w-3 rounded-full bg-white ${currentSlideIndex === index ? "w-6" : ""}`}
                onClick={() => updateCurrentSlideIndex(index)} />
            ))}
          </div><div className="flex items-center mt-8">
            <button
              className="bg-white text-black py-2 px-4 rounded-lg mr-4"
              onClick={skip}
            >
              Skip
            </button>
            <button
              className="bg-white text-black py-2 px-4 rounded-lg"
              onClick={goToNextSlide}
            >
              {currentSlideIndex === slides.length - 1 ? "Get Started" : "Next"}
            </button>
          </div>
          </>
      )}
      {currentSlideIndex == slides.length - 1 && (
        <>
        <div>
          <h1 className="mt-4 text-lg text-primary-900">
            Select Credential(s) to issue or verify
          </h1>
        </div>
        <div>
        <main className="flex flex-col items-center gap-5 justify-between mt-16 md:w-[740px] m-auto">
        <div className='flex flex-row gap-5 w-full px-5'>
          <div className='flex flex-row w-full border-b border-b-1 border-gray-200'>
            <input type="text" className='w-full mt-1 border-none outline-none focus:ring-0 bg-gray-50' onChange={handleSearchTermChange} />
          </div>
          <button onClick={() => { setModalVisible(true); }}> Custom Credential/</button>
        </div>
        {credentials.length === 0 && <div className='w-full mt-10 text-center'>No Credential with that name.</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-5 mt-10">
          {credentials.map(({ id, title, selected }) => (
            <Credential
              id={id}
              title={title}
              selected={selected}
              onClick={handleCredentialSelect}
              key={id}
            />
          ))}
        </div>
      </main>
      <div>
        <button onClick={handleStartIssuance}>
          Start
        </button>
      </div>
      <CustomCredentialModal show={modalVisible} onClose={() => { setModalVisible(!modalVisible) }} />
      </div>
        
        </>
      )}
    </div>
  );
};

export default OnBoarding;
