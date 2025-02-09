import {onClientRequest, onOriginResponse, onOriginRequest} from "../../../edgeworkers/examples/respond-from-edgeworkers/encoding/encoding/main";
import Request from "request";
import Response from "response";
import {atob, btoa, mock_base16_decode, mock_base64_decode, mock_base64url_decode} from "../../../__mocks__/encoding";


describe('EdgeWorker that has atob, btoa, baseX.decode usage', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("onClientRequest decodes hello World by using decode and atob ", () => {
        let requestMock = new Request();
        onClientRequest(requestMock);
        expect(mock_base64_decode).toHaveBeenCalledTimes(1);
        expect(atob).toHaveBeenCalledTimes(1);
        expect(mock_base64_decode).toHaveBeenCalledWith("SGVsbG8=", "String");
        expect(atob).toBeCalledWith("V29ybGQ=");
    });

    test("onOriginRequest decodes Hello World by using btoa, base64url.decode and base16.decode", () => {
        let requestMock = new Request();
        onOriginRequest(requestMock);
        expect(btoa).toHaveBeenCalledTimes(1);
        expect(mock_base64url_decode).toHaveBeenCalledTimes(1);
        expect(mock_base16_decode).toHaveBeenCalledTimes(1);

        expect(btoa).toHaveBeenCalledWith("Hello");
        expect(mock_base16_decode).toHaveBeenCalledWith("576F726C64", "String");
    });

    test("onOriginResponse decodes to Uint8Array using base64.decode", () => {
        let requestMock = new Request();
        let responseMock = new Response();
        onOriginResponse(requestMock, responseMock);
        expect(mock_base64_decode).toHaveBeenCalledTimes(1);

        expect(mock_base64_decode).toHaveBeenCalledWith("SGVsbG8sIHdvcmxk", "Uint8Array");
    });
});

