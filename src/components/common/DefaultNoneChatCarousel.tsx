import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

const slides = [
    {
        id: 1,
        subTitle: 'Sao chép chữ từ ảnh nhanh chóng',
        subDescription: 'Giờ đây bạn có thể trích xuất văn bản trực tiếp từ hình ảnh',
        image: 'https://res.cloudinary.com/dvynemzxx/image/upload/v1788427044/banners/p4yamqaecu67cn1ho49j.jpg',
    },
    {
        id: 2,
        subTitle: 'Nhắn tin nhiều hơn, soạn thảo nhanh hơn',
        subDescription: 'Hỗ trợ định dạng tin nhắn, gửi file dung lượng lớn và chia sẻ màn hình',
        image: 'https://res.cloudinary.com/dvynemzxx/image/upload/v1787144079/main-sample.png',
    },
    {
        id: 3,
        subTitle: 'Tối ưu cho làm việc nhóm',
        subDescription: 'Giao việc, nhắc hẹn và quản lý công việc hiệu quả ngay trong cuộc trò chuyện',
        image: 'https://res.cloudinary.com/dvynemzxx/image/upload/v1772605229/users/pwmfoxkoi7s5u4kcttpo.webp',
    },
];

export function DefaultNoneChatCarousel() {
    const [index, setIndex] = useState(0);

    return (
        <Container
            fluid
            className="w-100 h-100 d-flex flex-column justify-content-center align-items-center bg-white p-4"
        >
            <Stack
                gap={2}
                className="text-center align-items-center align-self-center mb-4"
                style={{ maxWidth: 480 }}
            >
                <h3 className="fw-semibold mb-0" style={{ color: '#0F172A', fontSize: '1.75rem' }}>
                    Chào mừng đến với <span className="fw-bold">Nalo PC!</span>
                </h3>
                <p className="text-secondary mb-0" style={{ fontSize: '0.925rem', lineHeight: 1.5 }}>
                    Khám phá những tiện ích hỗ trợ làm việc và trò chuyện cùng người thân, bạn bè được tối ưu hoá
                    cho máy tính của bạn.
                </p>
            </Stack>

            <div className="w-100" style={{ maxWidth: 520 }}>
                <Carousel
                    variant="dark"
                    activeIndex={index}
                    onSelect={setIndex}
                    indicators={false}
                    controls
                    interval={3500}
                >
                    {slides.map((slide) => (
                        <Carousel.Item key={slide.id}>
                            <Stack className="align-items-center text-center px-5">
                                <div
                                    className="d-flex align-items-center justify-content-center mb-4 w-100"
                                    style={{ height: 220 }}
                                >
                                    <Image
                                        src={slide.image}
                                        alt={slide.subTitle}
                                        fluid
                                        style={{ maxHeight: '100%', maxWidth: 280, objectFit: 'contain' }}
                                    />
                                </div>

                                <h5 className="fw-bold mb-2" style={{ color: '#0068FF', fontSize: '1.15rem' }}>
                                    {slide.subTitle}
                                </h5>
                                <p className="text-secondary mb-0" style={{ fontSize: '0.9rem', maxWidth: 380 }}>
                                    {slide.subDescription}
                                </p>
                            </Stack>
                        </Carousel.Item>
                    ))}
                </Carousel>

                <Stack direction="horizontal" gap={2} className="justify-content-center mt-4">
                    {slides.map((slide, i) => (
                        <Button
                            key={slide.id}
                            variant="light"
                            aria-label={`Chuyển đến slide ${i + 1}`}
                            onClick={() => setIndex(i)}
                            className="rounded-circle p-0 border-0"
                            style={{
                                width: 8,
                                height: 8,
                                minWidth: 8,
                                backgroundColor: i === index ? '#0068FF' : '#CBD5E1',
                                transition: 'background-color 0.2s ease-in-out',
                            }}
                        />
                    ))}
                </Stack>
            </div>
        </Container>
    );
}