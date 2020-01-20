// UDPServer.cpp : Этот файл содержит функцию "main". Здесь начинается и заканчивается выполнение программы.
//

#include "pch.h"
#define _WINSOCK_DEPRECATED_NO_WARNINGS
#define _CRT_SECURE_NO_WARNINGS
#include <iostream>
#include "winsock2.h"
#include <string>
#include <sstream>
#include <ctime>
#include "winsock2.h"

#pragma comment(lib, "WS2_32.lib")

#define  BUFFER_SIZE 50
#define PORT 3000

using namespace std;
string  GetErrorMsgText(int code)    // cформировать текст ошибки 
{
	string msgText;
	switch (code)                      // проверка кода возврата  
	{
	case WSASYSNOTREADY:          msgText = "WSASYSNOTREADY";         break;
	case WSAVERNOTSUPPORTED:          msgText = "WSAVERNOTSUPPORTED";         break;
	case WSANOTINITIALISED:          msgText = "WSANOTINITIALISED";         break;
	case WSAEDISCON:          msgText = "WSAEDISCON";         break;
	case WSATYPE_NOT_FOUND:          msgText = "WSATYPE_NOT_FOUND";         break;
	case WSAHOST_NOT_FOUND:          msgText = "WSAHOST_NOT_FOUND";         break;
	case WSATRY_AGAIN:          msgText = "WSATRY_AGAIN";         break;
	case WSANO_RECOVERY:          msgText = "WSANO_RECOVERY";         break;
	case WSANO_DATA:          msgText = "WSANO_DATA";         break;
	case WSA_INVALID_HANDLE:          msgText = "WSA_INVALID_HANDLE";         break;
	case WSA_INVALID_PARAMETER:          msgText = "WSA_INVALID_PARAMETER";         break;
	case WSA_IO_INCOMPLETE:          msgText = "WSA_IO_INCOMPLETE";         break;
	case WSA_IO_PENDING:          msgText = "WSA_IO_PENDING";         break;
	case WSA_NOT_ENOUGH_MEMORY:          msgText = "WSA_NOT_ENOUGH_MEMORY";         break;
	case WSA_OPERATION_ABORTED:          msgText = "WSA_OPERATION_ABORTED";         break;
	case WSASYSCALLFAILURE:          msgText = "WSASYSCALLFAILURE";         break;
	case WSAEFAULT:          msgText = "WSAEFAULT";         break;
	case WSAEMFILE:          msgText = "WSAEMFILE";         break;
	case WSAEWOULDBLOCK:          msgText = "WSAEWOULDBLOCK";         break;
	case WSAEINPROGRESS:          msgText = "WSAEINPROGRESS";         break;
	case WSAEALREADY:          msgText = "WSAEALREADY";         break;
	case WSAENOTSOCK:          msgText = "WSAENOTSOCK";         break;
	case WSAEDESTADDRREQ:          msgText = "WSAEDESTADDRREQ";         break;
	case WSAEMSGSIZE:          msgText = "WSAEMSGSIZE";         break;
	case WSAEPROTOTYPE:          msgText = "WSAEPROTOTYPE";         break;
	case WSAEINTR:          msgText = "WSAEINTR";         break;
	case WSAENOPROTOOPT:          msgText = "WSAENOPROTOOPT";         break;
	case WSAEOPNOTSUPP:          msgText = "WSAEOPNOTSUPP";         break;
	case WSAESOCKTNOSUPPORT:          msgText = "WSAESOCKTNOSUPPORT";         break;
	case WSAEPROTONOSUPPORT:          msgText = "WSAEPROTONOSUPPORT";         break;
	case WSAEAFNOSUPPORT:          msgText = "WSAEAFNOSUPPORT";         break;
	case WSAEADDRINUSE:          msgText = "WSAEADDRINUSE";         break;
	case WSAEADDRNOTAVAIL:          msgText = "WSAEADDRNOTAVAIL";         break;
	case WSAECONNREFUSED:          msgText = "WSAECONNREFUSED";         break;
	case WSAETIMEDOUT:          msgText = "WSAETIMEDOUT";         break;
	case WSAESHUTDOWN:          msgText = "WSAESHUTDOWN";         break;
	case WSAENOBUFS:          msgText = "WSAENOBUFS";         break;
	case WSAECONNABORTED:          msgText = "WSAECONNABORTED";         break;
	case WSAENETDOWN:          msgText = "WSAENETDOWN";         break;
	case WSAENETUNREACH:          msgText = "WSAENETUNREACH";         break;
	case WSAENETRESET:          msgText = "WSAENETRESET";         break;
	case WSAECONNRESET:          msgText = "WSAECONNRESET";         break;
	case WSAENOTCONN:          msgText = "WSAENOTCONN";         break;
	case WSAEISCONN:          msgText = "WSAEISCONN";         break;
	case WSAEACCES:         msgText = "WSAEACCES";        break;
	case WSAEPROCLIM:         msgText = "WSAEPROCLIM";        break;
	case WSAEHOSTUNREACH:         msgText = "WSAEHOSTUNREACH";        break;
	default:                msgText = "***ERROR***";      break;
	};
	return msgText;
};

string SetErrorMsgText(const string &messageText, int code) {
	return messageText + GetErrorMsgText(code);
};

int main() {
	setlocale(LC_ALL, "rus");
	WSADATA wsaData;
	SOCKET serverSocket;

	SOCKADDR_IN socketParameters;
	socketParameters.sin_family = AF_INET;
	socketParameters.sin_port = htons(PORT);
	socketParameters.sin_addr.s_addr = INADDR_ANY;

	SOCKADDR_IN clientSocketParameters;
	memset(&clientSocketParameters, 0, sizeof(clientSocketParameters));
	int clientSocketParametersSize = sizeof(clientSocketParameters);

	char inputBuffer[BUFFER_SIZE]="";
	char outputBuffer[BUFFER_SIZE] = "";
	int receivedSize = 0;
	int sentSize = 0;

	try {
		if (WSAStartup(MAKEWORD(2, 0), &wsaData) != 0)
			throw SetErrorMsgText("Startup: ", WSAGetLastError());

		if ((serverSocket = socket(AF_INET, SOCK_DGRAM, NULL)) == INVALID_SOCKET)
			throw SetErrorMsgText("socket: ", WSAGetLastError());

		if (bind(serverSocket, (LPSOCKADDR)&socketParameters, sizeof(socketParameters)) == SOCKET_ERROR)
			throw SetErrorMsgText("bind: ", WSAGetLastError());

			while ((receivedSize = recvfrom(serverSocket, inputBuffer, sizeof(inputBuffer), NULL,
				(sockaddr *)&clientSocketParameters, &clientSocketParametersSize)) != 0) {

				if (receivedSize == SOCKET_ERROR) {
					if (WSAGetLastError() != WSAECONNRESET) {
						throw SetErrorMsgText("recvfrom: ", WSAGetLastError());
					}
				}
				else {
					char buffer[] = "ECHO";
					strcat(buffer, inputBuffer);
					if ((sentSize = sendto(serverSocket, buffer, strlen(buffer) + 1, NULL,
						(sockaddr *)&clientSocketParameters, sizeof(clientSocketParameters))) ==
						SOCKET_ERROR)
						throw SetErrorMsgText("sendto: ", WSAGetLastError());
					cout << inputBuffer << endl;
				}
			}
		if (closesocket(serverSocket) == SOCKET_ERROR)
			throw SetErrorMsgText("closesocket: ", WSAGetLastError());

		if (WSACleanup() == SOCKET_ERROR)
			throw SetErrorMsgText("Cleanup: ", WSAGetLastError());
	}
	catch (string errorMsgText) {
		cout << endl << errorMsgText << endl;
	}

	system("pause");
	return 0;
}

