import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import IssueSection from '../components/IssueSection';
import VerificationSection from '../components/VerificationSection';
import { addQueryParamToCurrentURL } from '../lib/helper/addQueryParamToCurrentURL';

const ISSUE_MODE = 'issuance';
const VERIFY_MODE = 'verification';

type PortalMode = typeof ISSUE_MODE | typeof VERIFY_MODE;

export default function Credentials() {
  const [portalType, setPortalType] = useState<PortalMode>(ISSUE_MODE);

  const issuanceMode = portalType === ISSUE_MODE;
  const verificationMode = portalType === VERIFY_MODE;

  const router = useRouter();
  const params = router.query;

  function handlePortalModeChange() {
    if (portalType === VERIFY_MODE) {
      setPortalType(ISSUE_MODE);
      addQueryParamToCurrentURL('mode', ISSUE_MODE);
    } else {
      setPortalType(VERIFY_MODE);
      addQueryParamToCurrentURL('mode', VERIFY_MODE);
    }
  }

  useEffect(() => {
    const { mode } = params;
    if (mode !== undefined) {
      if ((mode as unknown as PortalMode) === ISSUE_MODE) {
        setPortalType(ISSUE_MODE);
      } else {
        setPortalType(VERIFY_MODE);
      }
    }
  }, [params]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className="mt-10 flex flex-row justify-center cursor-pointer"
        onClick={() => router.push('/')}
      >
      </div>
      <div className="mt-10 bg-gray-100 rounded-lg py-2.5 px-5">
        <div className="flex flex-row gap-5">
          <button
            onClick={handlePortalModeChange}
          >
            Issue
          </button>
          <button
            onClick={handlePortalModeChange}
          >
            Verify
          </button>
        </div>
      </div>

      <div className="w-11/12 md:w-7/12 text-center shadow-2xl rounded-lg mt-5 pt-8 pb-8 px-10 bg-white max-w-[960px]">
        {issuanceMode && <IssueSection />}
        {verificationMode && <VerificationSection />}
      </div>
    </div>
  );
}
