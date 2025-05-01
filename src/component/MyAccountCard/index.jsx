import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById } from '../../store/Slices/usersSlice';
import { Link, useParams } from 'react-router-dom';
import styles from './style.module.css';
import JobSeekerProfileItem from '../jobSeekerProfileItem';
import { SlLocationPin } from 'react-icons/sl';
import { CgWorkAlt } from 'react-icons/cg';
import { CgProfile } from 'react-icons/cg';
import { BiBookmarkAlt } from 'react-icons/bi';
import { GoClock } from 'react-icons/go';
import { FiPhoneCall } from 'react-icons/fi';
import { GrFacebookOption } from 'react-icons/gr';
import { BiLogoLinkedin } from 'react-icons/bi';
import { BiEnvelope } from 'react-icons/bi';
import { UilPen } from '@iconscout/react-unicons'
import img from "../../assets/images/userAvtar.svg"
import { Image } from 'react-bootstrap';
const MyAccountCard = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const user = useSelector((state) => state.users.user);
    const loading = useSelector((state) => state.users.loading);
    const error = useSelector((state) => state.users.error);
    const [User, setUser] = useState(user);

    useEffect(() => {
        dispatch(fetchUserById(userId));
    }, [dispatch, userId]);

    useEffect(() => {
        if (user?.socialMedia) {
            const parsedSocialMedia = JSON.parse(user.socialMedia);
            setUser({ ...user, socialMedia: parsedSocialMedia });
        }
    }, [user]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    if (!user) return <div>No user data available</div>;

    return (
        <div className={styles.mainCard}>
            <Link to='/dashboard/my-Profile'>
                <div className={`${styles.editUserImg}`}>
                    <UilPen className='text-third' />
                </div>
            </Link>
            <div className={`shadow-lg ${styles.mainCard_userImg}`}>

                <Image
                            src={
                              User?.profilePhoto
                            }
                            roundedCircle
                            onError={(e) => {
                              e.target.src = img;
                            }}
                            width="100%"
                            height={"100%"}
                            className="d-inline-block align-top "
                          />
            </div>
            <div className={styles.user}>
                <div className={styles.userDetails}>
                    <div className={styles.userDetails_name}>{User?.firstName} {User?.lastName}</div>
                    <div className={styles.userDetails_jobTitle}>{User?.category}</div>
                </div>
                <div> <a href="/public/Madonna-Adel.pdf" download><button className={`btn bg-green border-1 rounded-2 px-2 text-white ${styles.btnDownload}`} >Download CV</button></a></div> <div></div>
            </div>
            <ul>
                <li><JobSeekerProfileItem width='100%' backgroundColor={'var(--border02)'} content={`${User?.country}, ${User?.city}`} icon={SlLocationPin} /></li>
                <li><JobSeekerProfileItem width='100%' content={User?.category} backgroundColor={'var(--border03)'} icon={CgWorkAlt} /></li>
                <li><JobSeekerProfileItem width='100%' content={User?.experienceLevel} backgroundColor={'var(--border03)'} icon={CgProfile} /></li>
                <li><JobSeekerProfileItem width='100%' content={User?.qualifications} backgroundColor={'var(--border03)'} icon={BiBookmarkAlt} /></li>
                <li><JobSeekerProfileItem width='100%' content={User?.desiredJobType} backgroundColor={'var(--border03)'} icon={GoClock} /></li>
            </ul>
            <ul >
                <li><div className={styles.contact_section_text}>Contact Info</div></li>
                {User?.phone ? (
                    <li><JobSeekerProfileItem width='100%' content={User.phone} backgroundColor={'var(--border03)'} icon={FiPhoneCall} /></li>) : (
                    <p>please add your phone becouse the companies can call you</p>
                )
                }
                <li><JobSeekerProfileItem width='100%' content={User?.email} backgroundColor={'var(--border03)'} icon={BiEnvelope} /></li>


            </ul>
            <ul>
                {
                    User?.socialMedia?.facebook || User?.socialMedia?.linkedin ?
                        <li><div className={styles.contact_section_text}>Social Media</div></li> : null
                }

                <li className={styles.socialMedia_icons}>
                    {
                        User?.socialMedia?.facebook &&
                        <div className={styles.socialMedia_icon}>
                            <a
                                href={User?.socialMedia?.facebook?.startsWith("http")
                                    ? User.socialMedia.facebook
                                    : `https://${User.socialMedia.facebook}`
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <GrFacebookOption className='text-white' />
                            </a>

                        </div>
                    }

                    {
                        User?.socialMedia?.linkedin &&
                        <div className={styles.socialMedia_icon}>
                            <a
                                href={User?.socialMedia?.linkedin?.startsWith("http")
                                    ? User.socialMedia.linkedin
                                    : `https://${User.socialMedia.linkedin}`
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <BiLogoLinkedin className='text-white' />
                            </a>

                        </div>
                    }
                </li>
            </ul>

        </div>
    );
};

export default MyAccountCard;