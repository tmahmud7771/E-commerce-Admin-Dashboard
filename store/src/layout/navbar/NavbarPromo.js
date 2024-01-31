import { Fragment, useState, useEffect, useContext } from "react";
import Link from "next/link";
import { Transition, Popover } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import SettingServices from "@services/SettingServices";
import Cookies from "js-cookie";
import {
  FiGift,
  FiAlertCircle,
  FiHelpCircle,
  FiShoppingBag,
  FiFileText,
  FiUsers,
  FiPocket,
  FiPhoneIncoming,
} from "react-icons/fi";

//internal import
import { notifyError } from "@utils/toast";
import useGetSetting from "@hooks/useGetSetting";
import Category from "@component/category/Category";
import { SidebarContext } from "@context/SidebarContext";
import useUtilsFunction from "@hooks/useUtilsFunction";

const NavbarPromo = () => {
  const [languages, setLanguages] = useState([]);
  const [currentLang, setCurrentLang] = useState({});
  const { lang, storeCustomizationSetting } = useGetSetting();
  const { isLoading, setIsLoading } = useContext(SidebarContext);

  const { showingTranslateValue } = useUtilsFunction();

  const handleLanguage = (lang) => {
    setCurrentLang(lang);
    Cookies.set("_lang", lang?.iso_code, {
      sameSite: "None",
      secure: true,
    });
  };

  useEffect(() => {
    (async () => {
      {
        try {
          const res = await SettingServices.getShowingLanguage();
          setLanguages(res);

          const result = res?.find((language) => language?.iso_code === lang);
          setCurrentLang(result);
        } catch (err) {
          notifyError(err);
          console.log("error on getting lang", err);
        }
      }
    })();
  }, []);

  return (
    <>
      <div className="hidden lg:block xl:block bg-white border-b">
        <div className="max-w-screen-2xl mx-auto px-3 sm:px-10 h-12 flex justify-between items-center">
          <div className="inline-flex">
            <Popover className="relative">
              <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center md:justify-start md:space-x-10">
                  <Popover.Group
                    as="nav"
                    className="md:flex space-x-10 items-center"
                  >
                    {storeCustomizationSetting?.navbar
                      ?.categories_menu_status && (
                      <Popover className="relative font-serif">
                        <Popover.Button className="group inline-flex items-center py-2 hover:text-emerald-600 focus:outline-none">
                          <span className="font-serif text-sm font-medium">
                            {showingTranslateValue(
                              storeCustomizationSetting?.navbar?.categories
                            )}
                          </span>

                          <ChevronDownIcon
                            className="ml-1 h-3 w-3 group-hover:text-emerald-600"
                            aria-hidden="true"
                          />
                        </Popover.Button>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                        >
                          <Popover.Panel className="absolute z-10 -ml-1 mt-1 transform w-screen max-w-xs c-h-65vh bg-white">
                            <div className="rounded-md shadow-lg ring-1 ring-black ring-opacity-5 overflow-y-scroll flex-grow scrollbar-hide w-full h-full">
                              <Category />
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </Popover>
                    )}

                    {storeCustomizationSetting?.navbar?.about_menu_status && (
                      <Link href="/about-us">
                        <a
                          onClick={() => setIsLoading(!isLoading)}
                          className="font-serif mx-4 py-2 text-sm font-medium hover:text-emerald-600"
                        >
                          {showingTranslateValue(
                            storeCustomizationSetting?.navbar?.about_us
                          )}
                        </a>
                      </Link>
                    )}

                    {storeCustomizationSetting?.navbar?.contact_menu_status && (
                      <Link href="/contact-us">
                        <a
                          onClick={() => setIsLoading(!isLoading)}
                          className="font-serif mx-4 py-2 text-sm font-medium hover:text-emerald-600"
                        >
                          {showingTranslateValue(
                            storeCustomizationSetting?.navbar?.contact_us
                          )}
                        </a>
                      </Link>
                    )}

                    <Popover className="relative font-serif">
                      <Popover.Button className="group inline-flex items-center py-2 text-sm font-medium hover:text-emerald-600 focus:outline-none">
                        <span>
                          {showingTranslateValue(
                            storeCustomizationSetting?.navbar?.pages
                          )}
                        </span>
                        <ChevronDownIcon
                          className="ml-1 h-3 w-3 group-hover:text-emerald-600"
                          aria-hidden="true"
                        />
                      </Popover.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute z-10 -ml-1 mt-1 transform w-screen max-w-xs bg-white">
                          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-y-scroll flex-grow scrollbar-hide w-full h-full">
                            <div className="relative grid gap-2 px-6 py-6">
                              {storeCustomizationSetting?.navbar
                                ?.offers_menu_status && (
                                <span className="p-2  font-serif items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600">
                                  <div className="w-full flex">
                                    <FiGift className="my-auto" />
                                    <Link href="/offer">
                                      <a
                                        onClick={() => setIsLoading(!isLoading)}
                                        className="relative inline-flex items-cente font-serif ml-2 py-0 rounded text-sm font-medium  hover:text-emerald-600"
                                      >
                                        {showingTranslateValue(
                                          storeCustomizationSetting?.navbar
                                            ?.offers
                                        )}
                                      </a>
                                    </Link>
                                  </div>
                                </span>
                              )}
                              <span className="p-2  font-serif items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600">
                                <div className="w-full flex">
                                  <FiShoppingBag className="my-auto" />
                                  <Link href="/checkout">
                                    <a
                                      onClick={() => setIsLoading(!isLoading)}
                                      className="relative inline-flex items-cente font-serif ml-2 py-0 rounded text-sm font-medium  hover:text-emerald-600"
                                    >
                                      {showingTranslateValue(
                                        storeCustomizationSetting?.navbar
                                          ?.checkout
                                      )}
                                    </a>
                                  </Link>
                                </div>
                              </span>

                              {storeCustomizationSetting?.navbar
                                ?.faq_status && (
                                <span className="p-2 font-serif items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600">
                                  <div className="w-full flex">
                                    <FiHelpCircle className="my-auto" />
                                    <Link href="/faq">
                                      <a
                                        onClick={() => setIsLoading(!isLoading)}
                                        className="relative inline-flex items-cente font-serif ml-2 py-0 rounded text-sm font-medium  hover:text-emerald-600"
                                      >
                                        {showingTranslateValue(
                                          storeCustomizationSetting?.navbar?.faq
                                        )}
                                      </a>
                                    </Link>
                                  </div>
                                </span>
                              )}

                              {storeCustomizationSetting?.navbar
                                ?.about_menu_status && (
                                <span className="p-2  font-serif items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600">
                                  <div className="w-full flex">
                                    <FiUsers className="my-auto" />
                                    <Link href="/about-us">
                                      <a
                                        onClick={() => setIsLoading(!isLoading)}
                                        className="relative inline-flex items-cente font-serif ml-2 py-0 rounded text-sm font-medium  hover:text-emerald-600"
                                      >
                                        {showingTranslateValue(
                                          storeCustomizationSetting?.navbar
                                            ?.about_us
                                        )}
                                      </a>
                                    </Link>
                                  </div>
                                </span>
                              )}

                              {storeCustomizationSetting?.navbar
                                ?.contact_menu_status && (
                                <span className="p-2  font-serif items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600">
                                  <div className="w-full flex">
                                    <FiPhoneIncoming className="my-auto" />
                                    <Link href="/contact-us">
                                      <a
                                        onClick={() => setIsLoading(!isLoading)}
                                        className="relative inline-flex items-cente font-serif ml-2 py-0 rounded text-sm font-medium  hover:text-emerald-600"
                                      >
                                        {showingTranslateValue(
                                          storeCustomizationSetting?.navbar
                                            ?.contact_us
                                        )}
                                      </a>
                                    </Link>
                                  </div>
                                </span>
                              )}

                              {storeCustomizationSetting?.navbar
                                ?.privacy_policy_status && (
                                <span className="p-2  font-serif items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600">
                                  <div className="w-full flex">
                                    <FiPocket className="my-auto" />
                                    <Link href="/privacy-policy">
                                      <a
                                        onClick={() => setIsLoading(!isLoading)}
                                        className="relative inline-flex items-cente font-serif ml-2 py-0 rounded text-sm font-medium  hover:text-emerald-600"
                                      >
                                        {showingTranslateValue(
                                          storeCustomizationSetting?.navbar
                                            ?.privacy_policy
                                        )}
                                      </a>
                                    </Link>
                                  </div>
                                </span>
                              )}

                              {storeCustomizationSetting?.navbar
                                ?.term_and_condition_status && (
                                <span className="p-2  font-serif items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600">
                                  <div className="w-full flex">
                                    <FiFileText className="my-auto" />
                                    <Link href="/terms-and-conditions">
                                      <a
                                        onClick={() => setIsLoading(!isLoading)}
                                        className="relative inline-flex items-cente font-serif ml-2 py-0 rounded text-sm font-medium  hover:text-emerald-600"
                                      >
                                        {showingTranslateValue(
                                          storeCustomizationSetting?.navbar
                                            ?.term_and_condition
                                        )}
                                      </a>
                                    </Link>
                                  </div>
                                </span>
                              )}

                              <span className="p-2  font-serif items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600">
                                <div className="w-full flex">
                                  <FiAlertCircle className="my-auto" />
                                  <Link href="/404">
                                    <a
                                      onClick={() => setIsLoading(!isLoading)}
                                      className="relative inline-flex items-cente font-serif ml-2 py-0 rounded text-sm font-medium  hover:text-emerald-600"
                                    >
                                      404
                                    </a>
                                  </Link>
                                </div>
                              </span>
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </Popover>

                    {storeCustomizationSetting?.navbar?.offers_menu_status && (
                      <Link href="/offer">
                        <a
                          onClick={() => setIsLoading(!isLoading)}
                          className="relative inline-flex items-center  bg-red-100 font-serif ml-4 py-0 px-2 rounded text-sm font-medium text-red-500 hover:text-emerald-600"
                        >
                          {showingTranslateValue(
                            storeCustomizationSetting?.navbar?.offers
                          )}
                          <div className="absolute flex w-2 h-2 left-auto -right-1 -top-1">
                            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                          </div>
                        </a>
                      </Link>
                    )}
                  </Popover.Group>
                </div>
              </div>
            </Popover>
          </div>
          <div className="flex">
            {/* flag */}
            <div className="dropdown">
              <div
                className={`flot-l flag ${currentLang?.flag?.toLowerCase()}`}
              ></div>
              <button className="dropbtn">
                {currentLang?.name}
                &nbsp;<i className="fas fa-angle-down"></i>
              </button>
              <div className="dropdown-content">
                {languages?.map((language, i) => {
                  return (
                    <Link key={i + 1} href="/">
                      <a
                        onClick={() => {
                          handleLanguage(language);
                        }}
                      >
                        <div
                          className={`flot-l flag ${language?.flag?.toLowerCase()}`}
                        ></div>
                        {language?.name}
                      </a>
                    </Link>
                  );
                })}
              </div>
            </div>

            {storeCustomizationSetting?.navbar?.privacy_policy_status && (
              <Link href="/privacy-policy">
                <a
                  onClick={() => setIsLoading(!isLoading)}
                  className="font-serif mx-4 py-2 text-sm font-medium hover:text-emerald-600"
                >
                  {showingTranslateValue(
                    storeCustomizationSetting?.navbar?.privacy_policy
                  )}
                </a>
              </Link>
            )}
            {storeCustomizationSetting?.navbar?.term_and_condition_status && (
              <Link href="/terms-and-conditions">
                <a
                  onClick={() => setIsLoading(!isLoading)}
                  className="font-serif mx-4 py-2 text-sm font-medium hover:text-emerald-600"
                >
                  {showingTranslateValue(
                    storeCustomizationSetting?.navbar?.term_and_condition
                  )}
                </a>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarPromo;
