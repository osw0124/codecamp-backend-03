/**
 * @openapi
 * /users:
 *      get:
 *          summart: 커피메뉴 리스트 가져오기
 *          tags: [Users]
 *          parameters:
 *                  - in: query
 *          responses:
 *              200:
 *                  description: 성공
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  properties:
 *                                      email:
 *                                          type: string
 *                                          example: aaa@gmail.com
 *                                      name:
 *                                          type: string
 *                                          example: 철수
 *                                      phone:
 *                                          type: string
 *                                          example: 010-1234-5678
 *                                      personal:
 *                                          type: string
 *                                          example: 220110-2222222
 *                                      prefer:
 *                                          type: string
 *                                          example: https://naver.com
 *
 */
