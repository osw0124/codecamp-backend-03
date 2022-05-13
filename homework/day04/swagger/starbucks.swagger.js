/**
 * @openapi
 * /starbucks:
 *      get:
 *          summart: 커피메뉴 리스트 가져오기
 *          tags: [Starbucks]
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
 *                                      name:
 *                                          type: string
 *                                          example: 아메리카노
 *                                      kcal:
 *                                          type: int
 *                                          example: 5
 *
 */
