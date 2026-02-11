/* eslint-disable */
import React, { useState } from "react";
import { } from '@fortawesome/free-solid-svg-icons'

/** Table Layout */
const Table = () => {
    const data = [
        { id: 1, name: "Nguyen Van A", age: 25, email: "a@example.com" },
        { id: 2, name: "Tran Thi B", age: 30, email: "b@example.com" },
        { id: 3, name: "Le Van C", age: 28, email: "c@example.com" },
    ];
    return (
        <React.Fragment>
            <div className="overflow-x-auto">
                {/* Desktop - Dạng bảng */}
                <div className="hidden md:block">
                    <div className="grid grid-cols-4 bg-gray-100 p-3 text-left font-semibold border-b border-gray-300">
                        <div>STT</div>
                        <div>Tên</div>
                        <div>Tuổi</div>
                        <div>Email</div>
                    </div>

                    <div className="space-y-2">
                        {data.map((item) => (
                            <div key={item.id} className="grid grid-cols-4 p-3 border-b border-gray-200 hover:bg-gray-50" >
                                <div>{item.id}</div>
                                <div>{item.name}</div>
                                <div>{item.age}</div>
                                <div>{item.email}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile - Dạng card/danh sách */}
                <div className="block md:hidden space-y-3">
                    {data.map((item) => (
                        <div
                            key={item.id}
                            className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white"
                        >
                            <div className="font-semibold mb-2">Thông tin người dùng</div>
                            <div className="space-y-2">
                                <div><span className="font-medium">ID:</span> {item.id}</div>
                                <div><span className="font-medium">Tên:</span> {item.name}</div>
                                <div><span className="font-medium">Tuổi:</span> {item.age}</div>
                                <div><span className="font-medium">Email:</span> {item.email}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </React.Fragment>
    )
}

/** Button */
const Button = () => {
    return (
        <React.Fragment>
            {/* Button */}
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded">
                Default Button
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition duration-300">
                Primary
            </button>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded transition duration-300">
                Secondary
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition duration-300">
                Delete
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition duration-300">
                Submit
            </button>
        </React.Fragment>
    )
}

/** Modal */
const Modal = ({ isOpen, onClose, children }: { isOpen: boolean, onClose: () => void, children: React.ReactNode }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 transform transition-all duration-300 scale-100 opacity-100" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};
const ModalComponent = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <React.Fragment>
            <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" >
                Mở Modal
            </button>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-xl font-semibold mb-4">Thông báo</h2>
                <p className="mb-4">Bạn có chắc chắn muốn tiếp tục không?</p>
                <div className="flex justify-end space-x-2">
                    <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100" >
                        Hủy
                    </button>
                    <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" >
                        Đồng ý
                    </button>
                </div>
            </Modal>

            {/* Layout profile */}
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                    <img
                        src="https://i.pravatar.cc/200"
                        alt="Avatar"
                        className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
                    />
                    <div>
                        <h1 className="text-2xl font-bold">Nguyen Duc</h1>
                        <p className="text-gray-600">Admin • Thành viên từ 2020</p>
                    </div>
                </div>

                {/* Thông tin chi tiết */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h2 className="font-semibold text-gray-700">Thông tin cá nhân</h2>
                        <ul className="space-y-2 mt-2">
                            <li><span className="font-medium">Email:</span> nguyenduc@example.com</li>
                            <li><span className="font-medium">Số điện thoại:</span> 0909 123 456</li>
                            <li><span className="font-medium">Địa chỉ:</span> 123 Đường ABC, TP.HCM</li>
                            <li><span className="font-medium">Vai trò:</span> Quản trị viên</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold text-gray-700">Hoạt động gần đây</h2>
                        <ul className="space-y-2 mt-2">
                            <li>• Đăng nhập lần cuối lúc 10:00 AM hôm nay</li>
                            <li>• Cập nhật thông tin ngày 05/04/2025</li>
                            <li>• Tạo bài viết mới "Giới thiệu sản phẩm"</li>
                        </ul>
                    </div>
                </div>

                {/* Nút hành động */}
                <div className="mt-8 flex justify-end space-x-4">
                    <button onClick={() => setIsEditing(!isEditing)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition" >
                        {isEditing ? 'Hủy' : 'Chỉnh sửa'}
                    </button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
                        Đăng xuất
                    </button>
                </div>
            </div>
        </React.Fragment>
    );
};

/** Avatar */
const Avatar = () => {
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <React.Fragment>
            <div className="flex items-center space-x-4">
                <img src="https://i.pravatar.cc/100" alt="User" className="w-10 h-10 rounded-full object-cover" />
                <span className="font-medium">Welcome, Nguyen Duc</span>
            </div>

            {/* Js: handleFileChange */}
            <div className="flex flex-col items-center">
                {preview ? (
                    <img src={preview as string} alt="Avatar" className="w-24 h-24 rounded-full object-cover" />
                ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-white font-medium"> ND </div>
                )}
                <input type="file" accept="image/*" onChange={handleFileChange} className="mt-2" />
            </div>

            <div className="flex -space-x-3">
                <img src="https://i.pravatar.cc/100?img=1" alt="User 1" className="w-10 h-10 rounded-full border-2 border-white" />
                <img src="https://i.pravatar.cc/100?img=2" alt="User 2" className="w-10 h-10 rounded-full border-2 border-white" />
                <img src="https://i.pravatar.cc/100?img=3" alt="User 3" className="w-10 h-10 rounded-full border-2 border-white" />
            </div>

            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-white font-medium"> ND </div>
        </React.Fragment>
    )
}

/** User Profile */
const UserProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState<any>('profile');

    const user = {
        name: 'Nguyen Duc',
        email: 'nguyenduc@example.com',
        role: 'Quản trị viên',
        createdAt: '05/04/2025',
        avatar: 'https://i.pravatar.cc/200?img=1'
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 mb-8">
                <img src={user.avatar} alt="Avatar" className="w-24 h-24 rounded-full object-cover border-4 border-blue-500" />
                <div>
                    <h1 className="text-xl font-bold">{user.name}</h1>
                    <p className="text-gray-600">{user.email}</p>
                    <p className="text-sm text-gray-500">Vai trò: {user.role}</p>
                    <p className="text-sm text-gray-500">Thành viên từ: {user.createdAt}</p>
                </div>
            </div>

            {/* Thông tin chi tiết */}
            <div className="mb-8">
                <h2 className="font-semibold text-gray-700 mb-4">Thông tin cá nhân</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Tên đầy đủ</label>
                        {isEditing ? (
                            <input type="text" defaultValue={user.name} className="w-full p-2 border border-gray-300 rounded" />
                        ) : (
                            <p>{user.name}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Email</label>
                        {isEditing ? (
                            <input type="email" defaultValue={user.email} className="w-full p-2 border border-gray-300 rounded" />
                        ) : (
                            <p>{user.email}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Nút hành động */}
            <div className="flex justify-end space-x-4 mt-6">
                <button onClick={() => setIsEditing(!isEditing)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition" >
                    {isEditing ? 'Hủy' : 'Chỉnh sửa'}
                </button>
                <button onClick={() => alert('Lưu thành công!')} disabled={!isEditing} className={`px-4 py-2 rounded transition ${isEditing ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`} >
                    Lưu thay đổi
                </button>
            </div>

            {/* Tab tùy chọn */}
            <div className="mt-8 border-t pt-4">
                <div className="flex space-x-4">
                    <button className={`py-2 px-4 font-medium hover:text-blue-500 border-b-2 ${(activeTab === 'infomation')? 'text-blue-500 border-blue-500 ': 'text-gray-600 hover:text-blue-500'}`} onClick={() => setActiveTab('infomation')}>Thông tin chung</button>
                    <button className={`py-2 px-4 font-medium hover:text-blue-500 border-b-2 ${(activeTab === 'password')? 'text-blue-500 border-blue-500 ': 'text-gray-600 hover:text-blue-500'}`} onClick={() => setActiveTab('password')}>Mật khẩu</button>
                    <button className={`py-2 px-4 font-medium hover:text-blue-500 border-b-2 text-gray-600 hover:text-blue-500`}>Đăng xuất</button>
                </div>
                {activeTab === 'password' && (
                    <div className="mt-4">
                        <h3 className="font-semibold mb-2">Đổi mật khẩu</h3>
                        <form className="space-y-4">
                            <input type="password" placeholder="Mật khẩu hiện tại" className="w-full p-2 border rounded" />
                            <input type="password" placeholder="Mật khẩu mới" className="w-full p-2 border rounded" />
                            <input type="password" placeholder="Xác nhận mật khẩu" className="w-full p-2 border rounded" />
                            <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
                                Cập nhật mật khẩu
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

function Component() {
    return (
        <React.Fragment>
            <Button></Button>
            <ModalComponent></ModalComponent>
            <Avatar></Avatar>
            <Table></Table>
            <UserProfile></UserProfile>
        </React.Fragment>
    );
}

export default Component;
