import React, { useEffect, useState } from 'react';
import { MdLightMode } from 'react-icons/md';
import { AiOutlineExpandAlt, AiOutlineDownload } from 'react-icons/ai';
import Editor from '@monaco-editor/react';

const EditorPage = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLightMode, setIsLightMode] = useState(false);
    const [tab, setTab] = useState("html");
    const [code, setCode] = useState({
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Hello, world!</h1>
</body>
</html>`,
        css: "body { background-color: #f4f4f4; }",
        js: "// Write your JavaScript code here",
    });

    const toggleTheme = () => {
        setIsLightMode(!isLightMode);
        document.body.style.backgroundColor = isLightMode ? '#141414' : '#f4f4f4';
    };

    const run = () => {
        const html = code.html;
        const css = `<style>${code.css}</style>`;
        const js = `<script>${code.js}</script>`;
        const iframe = document.getElementById("iframe");

        if (iframe && tab !== "c++" && tab !== "java") {
            iframe.srcdoc = html + css + js;
        }
    };

    useEffect(() => {
        if (tab !== "c++" && tab !== "java") {
            run();
        }
    }, [code]);

    const handleCodeChange = (value) => {
        setCode({ ...code, [tab]: value || "" });
    };

    const downloadFile = () => {
        const fileContent = code[tab];
        const blob = new Blob([fileContent], { type: "text/plain" });
        const fileName = `code.${tab}`;
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(link.href); // Clean up
    };

    return (
        <div className="flex">
            {/* Left Panel */}
            <div
                className={`left transition-all duration-300`}
                style={{ width: isExpanded ? '100%' : '50%' }}
            >
                {/* Tabs and Controls */}
                <div
                    className={`flex items-center justify-between w-full ${isLightMode ? 'bg-[#f4f4f4]' : 'bg-[#272727]'
                        } h-[50px] px-[40px]`}
                >
                    <div className="flex items-center gap-2">
                        {['html', 'css', 'js'].map((currentTab) => (
                            <div
                                key={currentTab}
                                onClick={() => setTab(currentTab)}
                                className={`tab cursor-pointer p-[6px] px-[10px] text-[15px] ${tab === currentTab
                                    ? isLightMode
                                        ? 'bg-[#7f7fff] text-black'
                                        : 'bg-[#ff6347] text-white'
                                    : isLightMode
                                        ? 'bg-[#d3d3d3] text-gray-700'
                                        : 'bg-[#555555] text-gray-300'
                                    }`}
                            >
                                {currentTab.toUpperCase()}
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <i
                            className={`text-[20px] cursor-pointer ${isLightMode ? 'text-black' : 'text-white'
                                }`}
                            onClick={toggleTheme}
                        >
                            <MdLightMode />
                        </i>
                        <i
                            className={`text-[20px] cursor-pointer ${isLightMode ? 'text-black' : 'text-white'
                                }`}
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            <AiOutlineExpandAlt />
                        </i>
                        <i
                            className={`text-[20px] cursor-pointer ${isLightMode ? 'text-black' : 'text-white'
                                }`}
                            onClick={downloadFile}
                        >
                            <AiOutlineDownload />
                        </i>
                    </div>
                </div>

                {/* Editor */}
                <Editor
                    height="80vh"
                    theme={isLightMode ? 'light' : 'vs-dark'}
                    language={tab}
                    value={code[tab]}
                    onChange={handleCodeChange}
                />
            </div>

            {/* Output Panel */}
            {!isExpanded && (
                <iframe
                    id="iframe"
                    className="w-[50%] min-h-[80vh] bg-[#fff] text-black"
                    style={{
                        fontFamily: 'monospace',
                        padding: '10px',
                        border: '1px solid #ccc',
                    }}
                ></iframe>
            )}
        </div>
    );
};

export default EditorPage;
